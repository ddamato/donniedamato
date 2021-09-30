const path = require('path');
const fs = require('fs-extra');
const fm = require('front-matter');
const nunjucks = require('nunjucks');

const md = require('markdown-it')({
  html: true,
  linkify: true,
});

const loader = new nunjucks.FileSystemLoader(path.resolve(__dirname, '..', 'templates'));
const env = new nunjucks.Environment(loader, {
  trimBlocks: true,
  lstripBlocks: true,
});

const COMPILED_SITE_PATH = path.resolve(__dirname, '..', '_site');

const metadata = {
  title: `Donnie D'Amato`,
  description: `Lead UX Engineer based in New York. Architect of large-scale design systems. Living at the intersection product design and engineering`,
  url: 'https://donniedamato.info',
  fontPreload: 'https://fonts.googleapis.com/css2?family=Lora&family=Poppins:wght@300;700&display=swap',
  gtag: 'UA-54428903-2',
};

async function compile() {
  const files = await fs.readdir('./content');
  const contents = await Promise.all(files.filter((filename) =>  path.extname(filename) === '.md').map(read));
  const projects = contents.map(parse);
  const pages = projects
    .map(render)
    .map((html, index) => {
      return { 
        html, 
        filename: path.basename(files[index]).replace(path.extname(files[index]), '.html') 
      }
    })
    .concat({
      html: index(projects),
      filename: 'index.html'
    })
    .map(write)
  await Promise.all(pages);
}

async function read(filename) {
  return await fs.readFile(path.resolve('./content', filename), 'utf8');
}

async function write({ html, filename }) {
  const location = path.join(COMPILED_SITE_PATH, filename);
  await fs.ensureFile(location);
  return fs.writeFile(location, html, { encoding: 'utf8' });
}

function index(projects) {
  return env.render('index.njk', {
    headline: 'User Experience Professional',
    projects,
    ...metadata,
  });
}

function parse(markdown) {
  const { attributes, body } = fm(markdown);
  return { 
    content: md.render(body),
    ...attributes,
    ...metadata,
  }
}

function render(data) {
  return env.render('project.njk', data);
}

compile();
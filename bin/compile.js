const path = require('path');
const fs = require('fs-extra'); 
const fm = require('front-matter');
const md = require('markdown-it')({
  html: true,
  linkify: true,
});
const minify = require('html-minifier').minify;
const glob = require('glob-fs')({ gitignore: true });
const nunjucks = require('nunjucks');
const loader = new nunjucks.FileSystemLoader(path.resolve(__dirname, '..', 'templates'));
const env = new nunjucks.Environment(loader, {
  trimBlocks: true,
  lstripBlocks: true,
});
const COMPILED_SITE_PATH = path.resolve(__dirname, '..', '_site');
const DESCRIPTION = `The DAMATO Design System created by Donnie D'Amato is an exploration of architecting a design system without business influence; focusing on the best practices of user experience and web engineering.`;

async function compile() {
  const contentFiles = await glob.readdirPromise('content/*.md');
  const mdFiles = contentFiles.filter((file) => path.extname(file) === '.md');
  
  const gallery = mdFiles.map((file) => {
    const id = path.basename(file).replace(path.extname(file), '');
    const markdown = fs.readFileSync(file).toString();
    const { attributes, body } = fm(markdown);
    const content = md.render(body);
    return { ...attributes, content, id };
  }).sort((a, b) => Number(b.year) - Number(a.year));

  const index = env.render('base.njk', { 
    gallery,
    description: DESCRIPTION,
  });

  const pageContent = minify(index, { collapseWhitespace: true });
  const pageFileName = `${COMPILED_SITE_PATH}/index.html`;
  fs.ensureFileSync(pageFileName);
  fs.writeFileSync(pageFileName, pageContent, { encoding: 'utf8' });

}

compile();

let blockColor = 'var(--blockcolor)';
let pegColor = 'var(--pegcolor)';
let pegFace = 'var(--pegface)';

blockColor = 'rgb(9, 83, 156)';
pegColor = 'rgb(8, 75 ,152)';
pegFace = 'rgb(9, 83, 156)';

const illo = new Zdog.Illustration({
	// set canvas with selector
	element: ".zdog-illustration",
	zoom: 16,
	resize: true,
	rotate: { 
		x: -Zdog.TAU/12,
		y: Zdog.TAU/8,
	}
});

const block = new Zdog.Group({ addTo: illo });

new Zdog.Box({
	addTo: block,
	width: 24,
	height: 8,
	depth: 12,
	stroke: 2,
	color: blockColor,
});

const peg = new Zdog.Cylinder({
	addTo: block,
	rotate: { x: Zdog.TAU/4 },
	translate: { x: -9, y: -5, z: 3 },
	diameter: 4,
	length: 2,
	stroke: false,
	color: pegColor,
	frontFace: pegFace
});

peg.copy({
	translate: { x: -9, y: -5, z: -3 },
});

peg.copy({
	translate: { x: -3, y: -5, z: -3 },
});

peg.copy({
	translate: { x: 3, y: -5, z: -3 },
});

peg.copy({
	translate: { x: 9, y: -5, z: -3 },
});

peg.copy({
	translate: { x: 9, y: -5, z: 3 },
});

peg.copy({
	translate: { x: 3, y: -5, z: 3 },
});

peg.copy({
	translate: { x: -3, y: -5, z: 3 },
});


function animate() {
	illo.rotate.y += 0.001; 
	illo.updateRenderGraph();
	requestAnimationFrame(animate);
}

illo.updateRenderGraph();

if (window.navigator.hardwareConcurrency >= 8) {
	animate();
}

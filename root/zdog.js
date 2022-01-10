let blockColor = 'var(--blockcolor)';
let pegColor = 'var(--pegcolor)';
let pegFace = 'var(--pegface)';

blockColor = '#0095b8';
pegColor = '#00489b';
pegFace = '#0095b8';

const illo = new Zdog.Illustration({
	// set canvas with selector
	element: ".zdog-illustration",
	zoom: 16,
	resize: true,
	translate: { x: 0, y: -3 },
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


/* ====================== */

block.copyGraph({
	translate: { x: -6, y: 30, z: 6 },
	rotate:{ y: Zdog.TAU/4 }
});

block.copyGraph({
	translate: { x: 0, y: -18, z: -18 },
	rotate:{ y: Zdog.TAU/4 }
});

block.copyGraph({
	translate: { x: 12, y: 18, z: 36 },
});

block.copyGraph({
	translate: { x: -36, y: 18, z: 24 },
});

block.copyGraph({
	translate: { x: -24, y: -12, z: 18 },
	rotate:{ y: Zdog.TAU/4 }
});

block.copyGraph({
	translate: { x: -6, y: 18, z: -56 },
	rotate:{ y: Zdog.TAU/4 }
});

block.copyGraph({
	translate: { x: 18, y: 30, z: -30 },
});


function animate() {
	// illo.rotate.y += 0.001; 
	illo.updateRenderGraph();
	requestAnimationFrame(animate);
}

illo.updateRenderGraph();

if (window.navigator.hardwareConcurrency >= 8) {
	// animate();
}

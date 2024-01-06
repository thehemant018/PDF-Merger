import PDFMerger from 'pdf-merger-js';
const mergerPDFS = async (p1, p2) => {
  const merger = new PDFMerger();
  console.log(p1);
  console.log(p2);
  await merger.add(p1);
  await merger.add(p2);

  let d = new Date().getTime();
  await merger.save(`public/${d}.pdf`);
  return d;
};

export { mergerPDFS };

const text = "1234567890";
const chunks = Helper.makeChunks(text, 4);
const chunked = Helper.getChunkedString(text, 4);
const single = Helper.getSingleString(chunked);

console.log(chunks);
console.log(chunked);
console.log(single);

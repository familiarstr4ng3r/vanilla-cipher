
class Helper {
  /**
   * Split string into chunked array
   * @param {string} value Text value
   * @param {number} size Line length
   * @returns {Array<string>} Array of chunked strings
   */
  static makeChunks(value, size) {
    const count = Math.ceil(value.length / size);
    const chunks = new Array(count).fill("").map((_, index) => {
      return value.substr(index * size, size);
    });
    return chunks;
  }

  /**
   * Split string into chunks
   * @param {string} value Text value
   * @param {number} size Line length
   * @returns {string} Result of joining chunked array of strings with \n
   */
  static getChunkedString(value, size) {
    return Helper.makeChunks(value, size).join("\n");
  }

  /**
   * Convert chunked string into single one
   * @param {string} value Single line text that contains "\n" at the end of each line
   * @returns {string}
   */
  static getSingleString(value) {
    // /\n/g
    return value.replaceAll("\n", "");
    // return value.split("\n").join("");
  }

  static readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
    });
  }

  static downloadTextAsFile(name, content) {
    const a = document.createElement("a");
    // ! `data:text/plain;charset=utf-8, ${encodeURIComponent(content)}`
    a.href = URL.createObjectURL(new Blob([content]));
    a.download = name;
    a.click();
  }
  
}

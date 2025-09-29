// Handles buffer creation, filling, and freeing for FMU communication
export class FmiBufferManager {
  constructor(fmiInstance) {
    this.fmi = fmiInstance;
  }

  createBuffer(arr) {
    let size = arr.length * arr.BYTES_PER_ELEMENT;
    let ptr = this.fmi.inst._malloc(size);
    return { ptr, size };
  }

  createAndFillBuffer(arr) {
    const buffer = this.createBuffer(arr);
    this.fillBuffer(buffer, arr);
    return buffer;
  }

  freeBuffer(buffer) {
    if (buffer.ptr !== null) {
      this.fmi.inst._free(buffer.ptr);
    }
    buffer.ptr = null;
    buffer.size = null;
  }

  viewBuffer(buffer) {
    return new Uint8Array(this.fmi.inst.HEAPU8.buffer, buffer.ptr, buffer.size);
  }

  fillBuffer(buffer, arr) {
    const view = this.viewBuffer(buffer);
    view.set(new Uint8Array(arr.buffer));
    return buffer;
  }

  // Additional methods for real/boolean buffer operations
  getReals(references) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array(references));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Float64Array(references.length));
    const output = this.viewBuffer(outputBuffer);
    this.fmi.getReal(query, output, references.length);
    const real = new Float64Array(output.buffer, output.byteOffset, references.length);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return real;
  }

  getSingleReal(reference) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array([reference]));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Float64Array(1));
    const output = this.viewBuffer(outputBuffer);
    this.fmi.getReal(query, output, 1);
    const real = new Float64Array(output.buffer, output.byteOffset, 1);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return real[0];
  }

  getSingleBoolean(reference) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array([reference]));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Int32Array(1));
    const output = this.viewBuffer(outputBuffer);
    this.fmi.getBoolean(query, output, 1);
    const bool = new Int32Array(output.buffer, output.byteOffset, 1);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return bool[0];
  }

  getBooleans(references) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array(references));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Int32Array(references.length));
    const output = this.viewBuffer(outputBuffer);
    this.fmi.getBoolean(query, output, references.length);
    const bool = new Int32Array(output.buffer, output.byteOffset, references.length);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return bool;
  }
}

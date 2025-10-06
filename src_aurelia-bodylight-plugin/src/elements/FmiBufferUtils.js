// Utility class for FMU buffer management
export class FmiBufferUtils {
  /**
   * Allocates a buffer in the FMU's memory and fills it with the given typed array.
   * Returns a buffer object { ptr, size }.
   */
  static createAndFillBuffer(inst, typedArray) {
    const nBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
    const ptr = inst._malloc(nBytes);
    const heap = inst.HEAPU8;
    const src = new Uint8Array(typedArray.buffer);
    heap.set(src, ptr);
    return { ptr, size: nBytes };
  }

  /**
   * Returns a Uint8Array view of the buffer at the given pointer.
   */
  static viewBuffer(inst, ptrObj) {
    if (typeof ptrObj === 'object' && ptrObj.ptr !== undefined && ptrObj.size !== undefined) {
      return new Uint8Array(inst.HEAPU8.buffer, ptrObj.ptr, ptrObj.size);
    }
    return ptrObj;
  }

  /**
   * Frees a buffer previously allocated in FMU memory.
   */
  static freeBuffer(inst, ptrObj) {
    if (typeof ptrObj === 'object' && ptrObj.ptr !== undefined) {
      inst._free(ptrObj.ptr);
      ptrObj.ptr = null;
      ptrObj.size = null;
    } else {
      inst._free(ptrObj);
    }
  }
}

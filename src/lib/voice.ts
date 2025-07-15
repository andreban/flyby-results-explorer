// @ts-expect-error - LanguageModel is a global variable
const LanguageModel = window.LanguageModel;

export async function isMultimodalModelAvailable(): Promise<boolean> {
  if (!LanguageModel) {
    return false;
  }

  try {
    const availability = await LanguageModel.availability({
      expectedInputs: [{ type: 'audio' }],
    });

    return availability === 'available';
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getTranscriptionFromAudio(audioBlob: Blob): Promise<string> {
  try {
    if (!await isMultimodalModelAvailable()) {
      throw new Error('Multimodal model not available');
    }

    const session = await LanguageModel.create({
      expectedInputs: [{ type: 'audio' }],
    });

    const result = await session.prompt([{
      role: 'user',
      content: [
        { type: 'text', value: 'Transcribe this audio' },
        { type: 'audio', value: audioBlob },
      ]
    }]);

    return result;
  } catch (e) {
    const error = e as Error;
    console.error(error);
    return Promise.reject(error);
  }
}

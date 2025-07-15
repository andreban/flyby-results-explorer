// @ts-expect-error - LanguageModel is a global variable
const LanguageModel = window.LanguageModel;

export async function getTranscriptionFromAudio(audioBlob: Blob): Promise<string> {
  try {
    const availability = await LanguageModel.availability({
      expectedInputs: [{ type: 'audio' }],
    });

    if (availability !== 'available') {
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

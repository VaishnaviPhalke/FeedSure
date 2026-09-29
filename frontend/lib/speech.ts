// Voice synthesis helper for rural multilingual farmer accessibility

export function speakAdvisory(text: string, lang: 'en' | 'hi' | 'mr' = 'en'): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this environment.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set appropriate language code
  if (lang === 'hi') {
    utterance.lang = 'hi-IN';
  } else if (lang === 'mr') {
    // Marathi voice, fallback to Hindi if Marathi voice is not installed on OS
    utterance.lang = 'mr-IN';
  } else {
    utterance.lang = 'en-IN';
  }

  utterance.rate = 0.92; // Slightly slower, clearer speech for farmer comprehension
  utterance.pitch = 1.0;

  // Try finding voice match
  const voices = window.speechSynthesis.getVoices();
  const targetVoice = voices.find(v => v.lang.startsWith(lang) || (lang === 'mr' && v.lang.startsWith('hi')));
  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

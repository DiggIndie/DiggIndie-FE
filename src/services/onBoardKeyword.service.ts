import { onBoardApi } from '@/api/onBoard';

export const onBoardKeywordService = {
  async getKeywords() {
    try {
      const result = await onBoardApi.getOnboardingKeywords();
      return result.payload; // 데이터 배열만 반환
    } catch (err) {
      console.error('키워드 로드 중 에러:', err);
      return []; // 에러 시 빈 배열 반환
    }
  },
  async saveSelectedKeywords(keywordIds: number[]) {
    try {
      await onBoardApi.saveOnboardKeywords(keywordIds);
    } catch (err) {
      console.error('키워드 저장 중 에러:', err);
    }
  },
  async getSeletedKeywords() {
    try {
      const result = await onBoardApi.getSelectedOnboardingKeywords();
      return result.payload; // 데이터 배열만 반환
    } catch (err) {
      console.error('선택된 키워드 로드 중 에러:', err);
      return []; // 에러 시 빈 배열 반환
    }
  },
  async getSelectedArtists() {
    try {
      const result = await onBoardApi.getSelectedOnboardingArtists();
      return result.payload; // 데이터 배열만 반환
    } catch (err) {
      console.error('선택된 아티스트 로드 중 에러:', err);
      return { bands: [] }; // 에러 시 빈 배열 반환
    }
  },
};

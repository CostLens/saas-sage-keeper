
import { useContext } from 'react';
import { FeatureFlagsContext } from '@/contexts/FeatureFlagsContext';

export function useFeatureFlags() {
  return useContext(FeatureFlagsContext);
}

import { useContext } from 'react';
import { CampaignContext } from '../contexts/CampaignContext';

const useCampaign = () => useContext(CampaignContext);

export default useCampaign;
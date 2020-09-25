import ApiService from './ApiService';


const ChannelService = {};

ChannelService.getChannels = () => {
    const path = '/channels';
    return ApiService.apiFetch('GET', path).then(response => response.json());
};

export default ChannelService;

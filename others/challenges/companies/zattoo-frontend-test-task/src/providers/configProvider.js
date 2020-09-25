class ConfigProvider {
    set(config) {
        this.config = config;
    }

    get() {
        return this.config;
    }
}

const configProvider = new ConfigProvider();

export default configProvider;

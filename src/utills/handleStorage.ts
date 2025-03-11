const handleStorage = {
  setStorage: function (key: string, value: string) {
    localStorage.setItem(key, value);
  },

  getStorage: function (key: string) {
    return localStorage.getItem(key);
  },
};

export const shutBannerHandler = {
  KEY: "shutBanner",
  setExpiredTime: function (expMsec: number) {
    const date = new Date();
    const convertedExpiredDate = date.setTime(date.getTime() + expMsec * 1000);

    handleStorage.setStorage(this.KEY, convertedExpiredDate.toString());
  },

  isExpired: function () {
    const now = new Date();
    const convertedNowDate = now.setTime(now.getTime());
    const convertedExpiredDate = handleStorage.getStorage(this.KEY);

    if (convertedExpiredDate) {
      console.log(new Date(+convertedExpiredDate));
      console.log(new Date(convertedNowDate));
      return parseInt(convertedExpiredDate) < convertedNowDate;
    }
  },

  hasExpiredTime: function () {
    if (localStorage.getItem(this.KEY)) return true;
    return false;
  },

  removeItem: function () {
    if (localStorage.getItem(this.KEY)) {
      localStorage.removeItem(this.KEY);
    }
  },
};

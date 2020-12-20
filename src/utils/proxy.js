export const Proxy = {
  setProxy(hostsList) {
    console.log(hostsList, "hostsList");
    let condition = ``;

    hostsList.forEach(item => {
      if (item.isOpen && item.domain) {
        const realDomain = item.domain.replace(/\./g, "\\.");
        // TODO 解决https的代理问题
        condition += `
                if(shExpMatch(url, "http://${realDomain}*")){
                    return 'PROXY ${item.ip}:80';
                }
		    `;
      }
    });
    const script = `var FindProxyForURL = function(url, host){
						${condition}
						return 'DIRECT'
					}
	`;

    const config = {
      mode: "pac_script",
      pacScript: {
        data: script
      }
    };

    window.chrome.proxy.settings.set(
      { value: config, scope: "regular" },
      function() {}
    );
  },
  cancelProxy() {
    window.chrome.proxy.settings.set({ value: { mode: "direct" } }, function(
      e
    ) {
      console.log(e);
    });
  },
  addItem(key, item) {
    let list = this.get(key) || [];
    list.unshift(item);
    this.set(key, list);
    return list;
  },
  deleteItemBy(key, itemKey, val) {
    let list = this.get(key);
    if (list && list.length) {
      let i = list.findIndex(_it => _it[itemKey] === val);
      if (i > -1) list.splice(i, 1);
      this.set(key, list);
    }
    return list;
  }
};

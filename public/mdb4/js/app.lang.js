
var APP_PAGE_LANGUAGE = {
    language: 'ES',
    languages:[
        { code: "ES", text: "Español", img:""},
        { code: "EN", text: "Ingles" , img:""},
        { code: "PT", text: "Portugues",img:"" }
    ],
    getSelectedLanguage: function (lang) {
        for (var i = 0; i < this.languages.length; i++) {
            if (this.languages[i].code == this.language) {
                return this.languages[i];
                break;
            }
        }
    },
    getLanguage: function () {
        if (localStorage.getItem("lang")==null ) {
            localStorage.setItem("lang", this.language);
        }
        return localStorage.getItem("lang")
    },
    setLanguage: function (lang) {
        localStorage.setItem("lang", lang)
    }
}



export class Account {
    static sendProfileStrong(profile) {
        localStorage.setItem('profile', JSON.stringify(profile))
    }

    static sendTokenStrong(token) {
        localStorage.setItem('token', token)
    }

    static getProfileStrong() {
        try {
            const profileString = localStorage.getItem('profile');
            return JSON.parse(profileString)
        } catch (e) {
            return {}
        }
    }

    static getTokenStrong() {
        try {
            return localStorage.getItem('token')
        } catch (e) {
            return null
        }
    }

    static removeStrong() {
        localStorage.removeItem('profile')
        localStorage.removeItem('token')
    }

    static getNavbarUrlPath() {
        try {
            const navPath = localStorage.getItem('nav_url_path_name');
            const subMenuPath = localStorage.getItem('nav_sub_menu_url_path_name');
            return {
                navPath,
                subMenuPath
            }
        } catch (e) {
            return null
        }
    }

    static removeNavbarUrlPath() {

        localStorage.removeItem('nav_url_path_name');
        localStorage.removeItem('nav_sub_menu_url_path_name');

    }

    static setNavbarUrlPath(path) {
        localStorage.setItem('nav_url_path_name', path)
    }

    static setNavbarUrlPathSub(path) {
        localStorage.setItem('nav_sub_menu_url_path_name', path)
    }

    static setDestination(item) {
        localStorage.setItem('update_destination_about_item', item)
    }

    static getDestination() {
        try {
            const getAbout = localStorage.getItem('update_destination_about_item');
            return getAbout
        } catch (e) {
            return null
        }
    }

    static removeDestination() {
        localStorage.removeItem('update_destination_about_item')
    }
}

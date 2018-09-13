import $ from "jquery";

class MobileMenu{
  constructor(){
    this.menuIcon = $(".site-header__menu-icon");
    this.primaryNav = $(".primary-nav");
    this.events();
  }

  events(){
    this.menuIcon.on("click", this.menuTrigger.bind(this));
  }

  menuTrigger(){
    this.primaryNav.toggleClass("primary-nav--expanded");
    this.menuIcon.toggleClass("site-header__menu-icon--expanded");
  }
}

export default MobileMenu;

import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { Subscription } from "rxjs";
import { PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { AppService } from "../../app.service";
const SMALL_WIDTH_BREAKPOINT = 960;
@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})

export class AdminLayoutComponent implements OnInit {

  title = 'angular6-material-design-starter';
  opened: boolean = true;
  menus = [];

  selected = new FormControl(0);
  tabs = [];
  private _router: Subscription;

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  url: string;
  sidePanelOpened;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @ViewChild('sidemenu') sidemenu;
  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(
    private router: Router,
    public service: AppService,
    zone: NgZone) {
    this.mediaMatcher.addListener(mql => zone.run(() => {
      this.mediaMatcher = mql;
    }));
    this.getMenus();
  }


  getMenus() {
    this.service.httpGet('/assets/data/menus.json', {}, rs => {
      this.menus = rs;
      if (this.router.url == "/") {
        this.addTab(this.menus[0], this.menus[0].children[0]);
      } else {
        let m = this.getMenuItem(this.router.url);
        if (m.childitem == null) {
          this.addTab(this.menus[0], this.menus[0].children[0]);
        } else {
          this.addTab(m.menuitem, m.childitem);
        }
      }
    }, err => {
    })
  }

  getMenuItem(state) {
    var menuitem: any = {};
    var childitem: any = null;
    for (let i = 0; i < this.menus.length; i++) {
      const m = this.menus[i];
      for (let j = 0; j < m.children.length; j++) {
        const c = m.children[j];
        if (c.url == this.router.url) {
          menuitem = m;
          childitem = c;
          break;
        }
      }
    }
    return { menuitem: menuitem, childitem: childitem };
  }

  ngOnInit(): void {
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }

  receiveOptions($event): void {
    this.options = $event;
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
    if (!this.mediaMatcher.matches && !this.options.compact) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }

  addTab(menuitem, childitem) {
    let flag = false;
    let tabIdnex = -1;
    for (let i = 0; i < this.tabs.length; i++) {
      const element = this.tabs[i];
      if (childitem.name == element.name) {
        tabIdnex = i;
        flag = true;
        break;
      }
    }
    if (flag) {
      this.selected.setValue(tabIdnex);
      // this.router.navigate([this.tabs[tabIdnex].state]);
    } else {
      this.tabs.push(childitem);
      this.selected.setValue(this.tabs.length - 1);
      // this.router.navigate([this.tabs[this.tabs.length - 1].state]);
      // this.router.navigate([this.tabs[this.tabs.length - 1].state]);
    }
  }

  removeTab(index: number) {
    if (this.tabs.length > 1) {
      this.tabs.splice(index, 1);
    }
  }

  selectedIndexChange(event) {
    this.selected.setValue(event);
    this.router.navigate([this.tabs[event].url]);
  }
}


import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { Subscription } from "rxjs";
import { PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
const SMALL_WIDTH_BREAKPOINT = 960;
@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})

export class AdminLayoutComponent implements OnInit {

  title = 'angular6-material-design-starter';
  opened: boolean = true;
  menus = [
    {
      state: 'dashboard',
      name: 'DASHBOARD',
      type: 'link',
      icon: 'view_column',
    },
    {
      state: 'apps',
      name: 'APPS',
      type: 'sub',
      icon: 'apps',
      badge: [
        { type: 'red', value: '5' }
      ],
      children: [
        { state: 'calendar', name: 'CALENDAR' },
        { state: 'media', name: 'MEDIA' },
        { state: 'messages', name: 'MESSAGES' },
        { state: 'social', name: 'SOCIAL' },
        { state: 'chat', name: 'CHAT' }
      ]
    },
    {
      state: 'tables',
      name: 'DATATABLE',
      type: 'sub',
      icon: 'format_line_spacing',
      badge: [
        {
          type: 'blue-grey', value: '8'
        }
      ],
      children: [
        { state: 'fullscreen', name: 'FULLSCREEN' },
        { state: 'editing', name: 'EDITING' },
        { state: 'filter', name: 'FILTER' },
        { state: 'paging', name: 'PAGING' },
        { state: 'sorting', name: 'SORTING' },
        { state: 'pinning', name: 'PINNING' },
        { state: 'selection', name: 'SELECTION' },
      ]
    },
    {
      state: 'charts',
      name: 'CHARTS',
      type: 'link',
      icon: 'show_chart',
    }
  ];

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
    private _element: ElementRef,
    private router: Router,
    zone: NgZone) {
    this.mediaMatcher.addListener(mql => zone.run(() => {
      this.mediaMatcher = mql;
    }));
  }

  ngOnInit(): void {
    this.addTab(this.menus[0]);
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

  addTab(item) {

    let flag = false;
    let tabIdnex = -1;
    for (let i = 0; i < this.tabs.length; i++) {
      const element = this.tabs[i];
      if (item.name == element.name) {
        tabIdnex = i;
        flag = true;
        break;
      }
    }
    if (flag) {
      this.selected.setValue(tabIdnex);
      this.router.navigate([this.tabs[tabIdnex].state]);
    } else {
      this.tabs.push(item);
      this.selected.setValue(this.tabs.length - 1);
      this.router.navigate([this.tabs[this.tabs.length - 1].state]);
    }
  }

  removeTab(index: number) {
    if (this.tabs.length > 1) {
      this.tabs.splice(index, 1);
    }
  }

  selectedIndexChange(event) {
    this.selected.setValue(event);
    this.router.navigate([this.tabs[event].state]);
  }
}

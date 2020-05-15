import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";

@Component({
  selector: "app-tools",
<<<<<<< HEAD
  templateUrl: "tools.component.html",
=======
  templateUrl: "tools.component.html"
>>>>>>> 81516e456dd176ae6d5dc7f00f5599deacf86b1a
})
export class ToolsComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  constructor() {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("tools-page");

    var slider = document.getElementById("sliderRegular");

<<<<<<< HEAD
    if (slider != null)
      noUiSlider.create(slider, {
        start: 40,
        connect: false,
        range: {
          min: 0,
          max: 100,
        },
      });

    var slider2 = document.getElementById("sliderDouble");

    if (slider2 != null)
      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 100,
        },
      });
=======
    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById("sliderDouble");

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
>>>>>>> 81516e456dd176ae6d5dc7f00f5599deacf86b1a
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("tools-page");
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  constructor(public authenticationService: AuthenticationService) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    var slider = document.getElementById("sliderRegular");
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
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}

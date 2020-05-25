import { User } from "./../../../user";
import { AuthenticationService } from "./../../../authentication.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html",
  styleUrls: ["./profilepage.component.scss"],
})
export class ProfilepageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  userData: User;
  constructor(private auth: AuthenticationService) {
    this.auth.fetch(this.auth.getUserID()).subscribe((data) => {
      this.userData = data[0] as User;
    });
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}

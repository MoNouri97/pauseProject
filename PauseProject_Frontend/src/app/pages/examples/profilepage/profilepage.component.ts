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
    auth.getCurrentUser().subscribe((data) => {
      this.auth.userData = data;
      this.auth.getCurrentUser().subscribe((data) => {
        this.auth.afs
          .collection("users", (ref) => ref.where("uid", "==", data.uid))
          .valueChanges()
          .subscribe((data) => {
            if (data.length == 0) {
              this.auth.SetUserData(this.auth.userData);
              this.userData = this.auth.user;
            } else this.userData = data[0] as User;
          });
      });
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

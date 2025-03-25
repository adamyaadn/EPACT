define(['knockout', '../../firebase-config'], function(ko, firebaseConfig) {
  function LoginViewModel() {
    this.email = ko.observable("");
    this.password = ko.observable("");

    this.fakeLogin = () => {
      this.user({
        uid: "fakeUserId",
        email: this.email() || "fake@example.com",
        displayName: "Fake User",
      });

      console.log("Fake login successful!", this.user()); // ✅ Check if this prints
    };

    this.handleEmailLogin = () => {
      console.log("Login button clicked!");
      this.fakeLogin();
    };
    this.handleFacebookLogin = function() {
      firebaseConfig.facebookLogin();
    };

    this.loginWithGoogle = function() {
      firebaseConfig.loginWithGoogle();
    };

    this.user = ko.observable(null);

    firebaseConfig.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user(user);
      } else {
        this.user(null);
      }
    });

    this.isAuthenticated = ko.computed(() => !!this.user());
  }

  return LoginViewModel; // ✅ Ensure we return the function (constructor)
});

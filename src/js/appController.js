define([
  'ojs/ojcontext',
  'ojs/ojresponsiveutils',
  'ojs/ojresponsiveknockoututils',
  'knockout',
  'ojs/ojknockout',
  'views/Login',
  'ojs/ojrouter',
], function(Context, ResponsiveUtils, ResponsiveKnockoutUtils, ko, LoginViewModel, ojRouter) {
  // Initialize the router outside the ControllerViewModel
  ojRouter.defaults['urlAdapter'] = new ojRouter.urlParamAdapter();
  const router = ojRouter.rootInstance;
  router.configure({
    'login': { label: 'Login', isDefault: true },
    'dashboard': { label: 'Dashboard', value: 'dashboard', viewPath: 'views/dashboard' },
  });

  function ControllerViewModel() {
    console.log('✅ ControllerViewModel is being instantiated!');

    const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
    this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

    this.appName = ko.observable('App Name');
    this.userLogin = ko.observable('john.hancock@oracle.com');

    // Attach LoginViewModel
    this.loginVM = new LoginViewModel();

    this.footerLinks = [
      { name: 'About Oracle', linkId: 'aboutOracle', linkTarget: 'http://www.oracle.com/us/corporate/index.html' },
      { name: 'Contact Us', id: 'contactUs', linkTarget: 'http://www.oracle.com/us/corporate/contact/index.html' },
      { name: 'Legal Notices', id: 'legalNotices', linkTarget: 'http://www.oracle.com/us/legal/index.html' },
      { name: 'Terms Of Use', id: 'termsOfUse', linkTarget: 'http://www.oracle.com/us/legal/terms/index.html' },
      { name: 'Your Privacy Rights', id: 'yourPrivacyRights', linkTarget: 'http://www.oracle.com/us/legal/privacy/index.html' },
    ];

    // Store the computed observable in a property
    this.authSubscription = ko.computed(() => {
      console.log('🔄 Checking authentication status...');
      if (this.loginVM.isAuthenticated()) {
        console.log('✅ User is authenticated, navigating to dashboard');
        router.go('dashboard');
      } else {
        console.log('🚪 User not authenticated, navigating to login');
        router.go('login');
      }
    });
  }

  // Synchronize router before applying bindings
  ojRouter.sync()
    .then(() => {
      Context.getPageContext().getBusyContext().applicationBootstrapComplete();
      const app = new ControllerViewModel();

      // Apply bindings to the login form only
      ko.applyBindings(app.loginVM, document.getElementById('login-form'));

      console.log('🔗 Knockout bindings applied successfully!');
    })
    .catch((err) => {
      console.error('❌ Router sync failed:', err);
    });

  return ControllerViewModel;
});
package com.grievances;

import android.app.Application;
import android.util.Log;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.burnweb.rnsimplealertdialog.RNSimpleAlertDialogPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReactNativeConfigPackage(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            new RNGoogleSigninPackage(),
            new VectorIconsPackage(),
            new RNSimpleAlertDialogPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new FBSDKPackage(mCallbackManager)
      );
    }
  };

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    // If you want to use AppEventsLogger to log events.
    AppEventsLogger.activateApp(this);
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}

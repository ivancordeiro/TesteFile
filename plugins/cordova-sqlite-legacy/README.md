# Cordova/PhoneGap sqlite storage adapter - legacy plugin version with limited extra features

Native interface to sqlite in a Cordova/PhoneGap plugin for Android/iOS/macOS/Windows, with API similar to HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/).

License terms for Android and Windows platform versions: MIT or Apache 2.0

License terms for iOS/macOS platform version: MIT only

## About this plugin version branch

Plugin version with legacy support for Windows 8.1 / Windows Phone 8.1, along with limited extra features: REGEXP (Android/iOS/macOS), BASE64, and pre-populated databases

This plugin version branch uses a `before_plugin_install` hook to install sqlite3 library dependencies from `cordova-sqlite-storage-dependencies` via npm.

**NOTICE:** WP8 is no longer supported by this plugin version. WP8 supported in [brodybits / cordova-sqlite-legacy-build-support](https://github.com/brodybits/cordova-sqlite-legacy-build-support).

<!-- END About this plugin version branch -->

## WARNING: Multiple SQLite problem on Android

This plugin uses a non-standard [Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) implementation on Android. In case an application access the **same** database using multiple plugins there is a risk of data corruption ref: [litehelpers/Cordova-sqlite-storage#626](https://github.com/litehelpers/Cordova-sqlite-storage/issues/626)) as described in <http://ericsink.com/entries/multiple_sqlite_problem.html> and <https://www.sqlite.org/howtocorrupt.html>.

The workaround is to use the `androidDatabaseImplementation: 2` setting as described in the **Android sqlite implementation** section below:

```js
var db = window.sqlitePlugin.openDatabase({name: "my.db", androidDatabaseImplementation: 2});
```

<!-- END WARNING: Multiple SQLite problem on Android -->

## Services available

The primary author and maintainer [@brodybits (Christopher J. Brody aka Chris Brody)](https://github.com/brodybits) is available for part-time contract assignments. Services available for this project include:

- Support for Ionic and other Angular derivatives
- Single issue support
- Warranty and support retainers
- Priority fixes and enhancements
- Custom feature development

Other services available include:

- Front-end/back-end development
- Mentoring and training services

For more information:
- <http://litehelpers.net/>
- <sales@litehelpers.net>

<!-- END Services available -->

## A quick tour

To open a database:

```Javascript
var db = null;

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
});
```

**IMPORTANT:** Like with the other Cordova plugins your application must wait for the `deviceready` event. This is especially tricky in Angular/ngCordova/Ionic controller/factory/service callbacks which may be triggered before the `deviceready` event is fired.

To populate a database using the standard transaction API:

```Javascript
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
    tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
    tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
  }, function() {
    console.log('Populated database OK');
  });
```

To check the data using the standard transaction API:

```Javascript
  db.transaction(function(tx) {
    tx.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(tx, rs) {
      console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
    }, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  });
```

To populate a database using the SQL batch API:

```Javascript
  db.sqlBatch([
    'CREATE TABLE IF NOT EXISTS DemoTable (name, score)',
    [ 'INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101] ],
    [ 'INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202] ],
  ], function() {
    console.log('Populated database OK');
  }, function(error) {
    console.log('SQL batch ERROR: ' + error.message);
  });
```

To check the data using the single SQL statement API:

```Javascript
  db.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(rs) {
    console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
  }, function(error) {
    console.log('SELECT SQL statement ERROR: ' + error.message);
  });
```

See the [Sample section](#sample) for a sample with a more detailed explanation.

<!-- END quick tour -->

## Status

- WP8 platform is no longer supported by this plugin version. WP8 is supported along with Windows 8.1, Windows Phone 8.1, Windows 10 (UWP), Android, iOS, and macOS in [brodybits / cordova-sqlite-legacy-build-support](https://github.com/brodybits/cordova-sqlite-legacy-build-support).
- NOT supported by PhoneGap Developer App or PhoneGap Desktop App
- This plugin will NOT work on `cordova-android@7` due to issue with JAR and NDK library files as discussed in [litehelpers/Cordova-sqlite-storage#729](https://github.com/litehelpers/Cordova-sqlite-storage/issues/729).
- A recent version of the Cordova CLI (such as `6.5.0` / `7.1.0`) is recommended. (Cordova CLI 8.x includes `cordova-android@7`, NOT supported by this plugin due to [litehelpers/Cordova-sqlite-storage#729](https://github.com/litehelpers/Cordova-sqlite-storage/issues/729).) Cordova versions older than `6.0.0` are missing the `cordova-ios@4.0.0` security fixes. In addition it is *required* to use `cordova prepare` in case of cordova-ios older than `4.3.0` (Cordova CLI `6.4.0`).
- This plugin version branch uses a `before_plugin_install` hook to install sqlite3 library dependencies from `cordova-sqlite-ext-deps` via npm.
- Use of other systems such as Cordova Plugman, PhoneGap CLI, PhoneGap Build, and Intel XDK is no longer supported since they do not honor the `before_plugin_install` hook. The supported solution is to use [litehelpers / Cordova-sqlite-evcore-extbuild-free](https://github.com/litehelpers/Cordova-sqlite-evcore-extbuild-free) (available with GPL or commercial license options) or [litehelpers / Cordova-sqlite-legacy-build-support](https://github.com/litehelpers/Cordova-sqlite-legacy-build-support) (limited testing, limited updates)
- The iOS database location is now mandatory, as documented below.
- This version includes the following extra features:
  - Pre-populated database support for all platforms Android/iOS/Windows;
  - BASE64 integrated from [brodybits / sqlite3-base64](https://github.com/brodybits/sqlite3-base64), using [brodybits / libb64-encode](https://github.com/brodybits/libb64-encode) (based on <http://libb64.sourceforge.net/> by Chris Venter, public domain)
  - REGEXP for Android (default Android-sqlite-connector database implementation), iOS, and macOS using [brodybits / sqlite3-regexp-cached](https://github.com/brodybits/sqlite3-regexp-cached) (based on <http://git.altlinux.org/people/at/packages/?p=sqlite3-pcre.git> by Alexey Tourbin, public domain)
  - DEPRECATED and WILL BE REMOVED in the near future: BLOB data reading (from pre-populated database) for Android/iOS, with the following caveat for the Android version: the database must be opened with the `androidDatabaseImplementation: 2` option to use the built-in android.database implementation. **RECOMMENDED SOLUTION**: use SELECT BASE64(column) to SELECT BLOB data as described below (WITHOUT use of the `androidDatabaseImplementation: 2` setting).
- SQLite version `3.15.2` included when building with the following build settings:
  - `SQLITE_THREADSAFE=2` on iOS/macOS (`SQLITE_THREADSAFE=1` on Android/Windows)
  - `SQLITE_DEFAULT_MEMSTATUS=0` (iOS/macOS only)
  - `SQLITE_OMIT_DECLTYPE` (iOS/macOS only)
  - `SQLITE_OMIT_DEPRECATED` (iOS/macOS only)
  - `SQLITE_OMIT_PROGRESS_CALLBACK` (iOS/macOS only)
  - `SQLITE_OMIT_SHARED_CACHE` (iOS/macOS only)
  - `SQLITE_TEMP_STORE=2`
  - `SQLITE_OMIT_LOAD_EXTENSION`
  - `SQLITE_ENABLE_FTS3`
  - `SQLITE_ENABLE_FTS3_PARENTHESIS`
  - `SQLITE_ENABLE_FTS4`
  - `SQLITE_ENABLE_RTREE`
  - `SQLITE_DEFAULT_PAGE_SIZE=1024` and `SQLITE_DEFAULT_CACHE_SIZE=2000` to avoid "potentially distruptive change(s)" from SQLite 3.12.0 ref: <http://sqlite.org/pgszchng2016.html>
  - `SQLITE_OMIT_BUILTIN_TEST` - TBD unwanted option to be removed in the near future (Android/Windows)
  - `SQLITE_OS_WINRT` (Windows only)
- This version branch supports the use of two (2) possible Android sqlite database implementations:
  - default: lightweight [Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) (using [brodybits / Android-sqlite-ext-native-driver](https://github.com/brodybits/Android-sqlite-ext-native-driver))
  - optional: built-in Android database classes (usage described below)
- Amazon Fire-OS is dropped due to lack of support by Cordova. Android platform version should be used to deploy to Fire-OS 5.0(+) devices. For reference: [cordova/cordova-discuss#32 (comment)](https://github.com/cordova/cordova-discuss/issues/32#issuecomment-167021676)
- Windows platform version (using a customized version of the performant [doo / SQLite3-WinRT](https://github.com/doo/SQLite3-WinRT) C++ component) has the following known limitations:
  - FIXED in cordova-sqlite-storage plugin version: Windows platform version fails with an error in case an `undefined` SQL parameter argument value is used.
  - This version branch has dependency on `v140` build toolset included by Visual Studio 2015 ref: [litehelpers/Cordova-sqlite-storage#580](https://github.com/litehelpers/Cordova-sqlite-storage/issues/580) (UNTESTED and UNSUPPORTED WORKAROUND for Visual Studio 2017 is described at: <https://developercommunity.visualstudio.com/content/problem/48806/cant-find-v140-in-visual-studio-2017.html>)
  - It is **not** possible to use this plugin with the default "Any CPU" target. A specific target CPU type **must** be specified when building an app with this plugin.
  - Truncation issue with UNICODE `\u0000` character (same as `\0`)
  - No background processing
  - INCORRECT error code (0) and INCONSISTENT error message (missing actual error info) in error callbacks ref: [litehelpers/Cordova-sqlite-storage#539](https://github.com/litehelpers/Cordova-sqlite-storage/issues/539)
  - _REGEXP is currently not supported on Windows_.
  - ~~Not possible to read BLOB column values~~ *Must use BASE64 function to read BLOB values as documented below*
  - Windows platform version uses `UTF-16le` internal database encoding while the other platform versions use `UTF-8` internal encoding. (`UTF-8` internal encoding is preferred ref: [litehelpers/Cordova-sqlite-storage#652](https://github.com/litehelpers/Cordova-sqlite-storage/issues/652))
- The macOS platform version ("osx" platform) is not tested in a release build and should be considered pre-alpha.
- Android versions supported: 2.3.3 - 7.1.1 (API level 10 - 25), depending on Cordova version ref: <https://cordova.apache.org/docs/en/latest/guide/platforms/android/>
- iOS versions supported: 8.x / 9.x / 10.x / 11.x (see [deviations section](#deviations) below for differences in case of WKWebView)
- FTS3, FTS4, and R-Tree are fully tested and supported for all target platforms in this version branch.
- Default `PRAGMA journal_mode` setting (*tested*):
  - Android (builtin android.database implementation _as selected using the `androidDatabaseImplementation` option in `window.sqlitePlugin.openDatabase`_): `persist` _(Android pre-8.0)_
  - otherwise: `delete`
- AUTO-VACUUM is not enabled by default. If no form of `VACUUM` or `PRAGMA auto_vacuum` is used then sqlite will automatically reuse deleted data space for new data but the database file will never shrink. For reference: <http://www.sqlite.org/pragma.html#pragma_auto_vacuum> and [litehelpers/Cordova-sqlite-storage#646](https://github.com/litehelpers/Cordova-sqlite-storage/issues/646)
- In case of memory issues please use smaller transactions or use the plugin version at [litehelpers / Cordova-sqlite-evcore-extbuild-free](https://github.com/litehelpers/Cordova-sqlite-evcore-extbuild-free) (GPL or commercial license terms).

<!-- END Status -->

## Announcements

- This legacy plugin version includes support for Windows 8.1 and Windows Phone 8.1 along with Android/iOS/macOS/Windows 10 (UWP), with REGEXP support for Android/iOS/macOS, BASE64 and pre-populated databases for all platforms.
- Ionic 3 starter template is available at: [iursevla / ionic3-PreDB](https://github.com/iursevla/ionic3-PreDB), Unlicense (public domain)
- Ionic 2 starter template is available at: [iursevla / ionic2-PreDB](https://github.com/iursevla/ionic2-PreDB), Unlicense (public domain)
- Advanced Ionic v1.x starter template with pre-populated SQLite database at: [jdnichollsc / Ionic-Starter-Template](https://github.com/jdnichollsc/Ionic-Starter-Template) (MIT license)
- Nice overview of cordova-sqlite-storage and other alternatives for storing local data at: <https://www.sitepoint.com/storing-local-data-in-a-cordova-app/>
- New alternative solution for small data storage (no pre-populated database support): [TheCocoaProject/ cordova-plugin-nativestorage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage) - simpler "native storage of variables" for Android/iOS/Windows
- Resolved Java 6/7/8 concurrent map compatibility issue reported in [litehelpers/Cordova-sqlite-storage#726](https://github.com/litehelpers/Cordova-sqlite-storage/issues/726), THANKS to pointer by [@NeoLSN (Jason Yang/楊朝傑)](https://github.com/NeoLSN) in [litehelpers/Cordova-sqlite-storage#727](https://github.com/litehelpers/Cordova-sqlite-storage/issues/727).
- Updated workaround solution to [BUG 666 (litehelpers/Cordova-sqlite-storage#666)](https://github.com/litehelpers/Cordova-sqlite-storage/issues/666) (possible transaction issue after window.location change with possible data loss): close database if already open before opening again
- Windows 10 (UWP) build with /SAFESEH flag on Win32 (x86) target to specify "Image has Safe Exception Handlers" as described in <https://docs.microsoft.com/en-us/cpp/build/reference/safeseh-image-has-safe-exception-handlers>
- Fixed iOS/macOS platform version to use [PSPDFThreadSafeMutableDictionary.m](https://gist.github.com/steipete/5928916) to avoid threading issue ref: [litehelpers/Cordova-sqlite-storage#716](https://github.com/litehelpers/Cordova-sqlite-storage/issues/716)
- [brodybits / cordova-sqlite-ext-bootstrap-starter-app](https://github.com/brodybits/cordova-sqlite-ext-bootstrap-starter-app) project is a CC0 (public domain) starting point with a pre-populated database working, may also be used to reproduce issues with this plugin. In addition [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app) may be used to reproduce issues with other versions of this plugin.
- The Lawnchair adapter is now moved to [litehelpers / cordova-sqlite-lawnchair-adapter](https://github.com/litehelpers/cordova-sqlite-lawnchair-adapter).
- This plugin version now supports SELECT BLOB data in Base64 format on all platforms in addition to REGEXP (Android/iOS/macOS) and pre-populated database (all platforms).
- [brodybits / sql-promise-helper](https://github.com/brodybits/sql-promise-helper) provides a Promise-based API wrapper.
- [nolanlawson / pouchdb-adapter-cordova-sqlite](https://github.com/nolanlawson/pouchdb-adapter-cordova-sqlite) supports this plugin along with other implementations such as [nolanlawson / sqlite-plugin-2](https://github.com/nolanlawson/sqlite-plugin-2) and [Microsoft / cordova-plugin-websql](https://github.com/Microsoft/cordova-plugin-websql).
- macOS ("osx" platform) is now supported
- New [litehelpers / Cordova-sqlite-evcore-extbuild-free](https://github.com/litehelpers/Cordova-sqlite-evcore-extbuild-free) plugin version with Android JSON and SQL statement handling implemented in C, as well as support for PhoneGap Build, Intel XDK, etc. (GPL or commercial license terms). Handles large SQL batches in less than half the time as this plugin version. Also supports arbitrary database location on Android.
- Published [brodybits / Cordova-quick-start-checklist](https://github.com/brodybits/Cordova-quick-start-checklist) and [brodybits / Avoiding-some-Cordova-pitfalls](https://github.com/brodybits/Avoiding-some-Cordova-pitfalls).
- Android platform version currently uses the lightweight [Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) by default configuration (may be changed as described below).
- Self-test functions to verify proper installation and operation of this plugin
- More explicit `openDatabase` and `deleteDatabase` `iosDatabaseLocation` option
- Added straightforward sql batch function
- [MetaMemoryT / websql-promise](https://github.com/MetaMemoryT/websql-promise) now provides a Promises-based interface to both Web SQL and this plugin
- [SQLCipher](https://www.zetetic.net/sqlcipher/) for Android/iOS/macOS/Windows is supported by [litehelpers / Cordova-sqlcipher-adapter](https://github.com/litehelpers/Cordova-sqlcipher-adapter)

<!-- END Announcements -->

## Highlights

- Drop-in replacement for HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/): the only change should be to replace the static `window.openDatabase()` factory call with `window.sqlitePlugin.openDatabase()`, with parameters as documented below. Known deviations are documented in the [deviations section](#deviations) below.
- Pre-populated openDatabase option (usage described below)
- Failure-safe nested transactions with batch processing optimizations (according to HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/))
- Transaction API (based on HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/)) is designed for maximum flexiblibility, does not allow any transactions to be left hanging open.
- As described in [this posting](http://brodyspark.blogspot.com/2012/12/cordovaphonegap-sqlite-plugins-offer.html):
  - Keeps sqlite database in known, platform specific user data location on all supported platforms (Android/iOS/macOS/Windows), which can be reconfigured on iOS/macOS. Whether or not the database on the iOS platform is synchronized to iCloud depends on the selected database location.
  - No arbitrary size limit. SQLite limits described at: <http://www.sqlite.org/limits.html>
- Also validated for multi-page applications by internal test selfTest function.
- This project is self-contained though with sqlite3 dependencies auto-fetched by npm. There are no dependencies on other plugins such as cordova-plugin-file.
- Windows platform version uses a customized version of the performant [doo / SQLite3-WinRT](https://github.com/doo/SQLite3-WinRT) C++ component.
- [SQLCipher](https://www.zetetic.net/sqlcipher/) support for Android/iOS/macOS/Windows is available in: [litehelpers / Cordova-sqlcipher-adapter](https://github.com/litehelpers/Cordova-sqlcipher-adapter)
- Intellectual property:
  - All source code is tracked to the original author in git, except for code in Android and iOS/macOS `createFromResource` functions for pre-populated databases which is marked as based on various sources.
  - Major authors are tracked in AUTHORS.md.
  - License of each component is tracked in LICENSE.md.
  - History of this project is also described in HISTORY.md.

**TIP:** It is possible to migrate from Cordova to a pure native solution and continue using the data stored by this plugin.

<!-- END Highlights -->

## Getting started

### Recommended prerequisites

- Install a recent version of Cordova CLI, create a simple app with no plugins, and run it on the desired target platforms.
- Add a very simple plugin such as `cordova-plugin-dialogs` or an echo plugin and get it working. Ideally you should be able to handle a callback with some data coming from a prompt.

These prereqisites are very well documented in a number of excellent resources including:
- <http://cordova.apache.org/> (redirected from <http://cordova.io>)
- <http://www.tutorialspoint.com/cordova/>
- <https://ccoenraets.github.io/cordova-tutorial/>
- <https://www.toptal.com/mobile/developing-mobile-applications-with-apache-cordova>
- <http://www.tutorialspoint.com/cordova/index.htm>

More resources can be found by <https://www.google.com/search?q=cordova+tutorial>. There are even some tutorials available on YouTube as well.

In addition, this guide assumes a basic knowledge of some key JavaScript concepts such as variables, function calls, and callback functions. There is an excellent explanation of JavaScript callbacks at <http://cwbuecheler.com/web/tutorials/2013/javascript-callbacks/>.

**MAJOR TIPS:** As described in the [Installing](#installing) section:
- It is recommended to use the `--save` flag when installing plugins to track them in `config.xml`. If all plugins are tracked in `config.xml` then there is no need to commit the `plugins` subdirectory tree into the source repository.
- In general it is *not* recommended to commit the `platforms` subdirectory tree into the source repository.

**NOTICE:** This plugin is only supported with the Cordova CLI. This plugin is *not* supported with other Cordova/PhoneGap systems such as PhoneGap CLI, PhoneGap Build, Plugman, Intel XDK, Webstorm, etc.

### Windows platform notes

The Windows platform can present a number of challenges which increase when using this plugin. The following tips are recommended for getting started with Windows:

- First start to build and run an app on another platform such as Android or iOS with this plugin.
- Try working with a very simple app using simpler plugins such as cordova-plugin-dialogs and possibly cordova-plugin-file on the Windows platform.
- Read through the **Windows platform usage** of the [Installing](#installing) section.
- Then try adding this plugin to a very simple app such as [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app) and running the Windows project in the Visual Studio GUI with a specific target CPU selected. **WARNING:** It is not possible to use this plugin with the "Any CPU" target.

### Quick installation

Use the following command to install this plugin from the Cordova CLI:

```shell
cordova plugin add cordova-sqlite-ext --save
```

Add any desired platform(s) if not already present, for example:

```shell
cordova platform add android
```

**OPTIONAL:** prepare before building (**MANDATORY** for cordova-ios older than `4.3.0` (Cordova CLI `6.4.0`))

```shell
cordova prepare
```

or to prepare for a single platform, Android for example:

```shell
cordova prepare android
```

Please see the [Installing](#installing) section for more details.

**NOTE:** The new [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app) project includes the echo test, self test, and string test described below along with some more sample functions.

<!-- END Quick installation -->

### Self test

Try the following programs to verify successful installation and operation:

**Echo test** - verify successful installation and build:

```js
document.addEventListener('deviceready', function() {
  window.sqlitePlugin.echoTest(function() {
    console.log('ECHO test OK');
  });
});
```

**Self test** - automatically verify basic database access operations including opening a database; basic CRUD operations (create data in a table, read the data from the table, update the data, and delete the data); close and delete the database:

```js
document.addEventListener('deviceready', function() {
  window.sqlitePlugin.selfTest(function() {
    console.log('SELF test OK');
  });
});
```

**NOTE:** It may be easier to use a JavaScript or native `alert` function call along with (or instead of) `console.log`  to verify that the installation passes both tests. Same for the SQL string test variations below. (Note that the Windows platform does not support the standard `alert` function, please use `cordova-plugin-dialogs` instead.)

### SQL string test

This test verifies that you can open a database, execute a basic SQL statement, and get the results (should be `TEST STRING`):

```js
document.addEventListener('deviceready', function() {
  var db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
  db.transaction(function(tr) {
    tr.executeSql("SELECT upper('Test string') AS upperString", [], function(tr, rs) {
      console.log('Got upperString result: ' + rs.rows.item(0).upperString);
    });
  });
});
```

Here is a variation that uses a SQL parameter instead of a string literal:

```js
document.addEventListener('deviceready', function() {
  var db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
  db.transaction(function(tr) {
    tr.executeSql('SELECT upper(?) AS upperString', ['Test string'], function(tr, rs) {
      console.log('Got upperString result: ' + rs.rows.item(0).upperString);
    });
  });
});
```

### Moving forward

It is recommended to read through the [usage](#usage) and [sample](#sample) sections before building more complex applications. In general it is recommended to start by doing things one step at a time, especially when an application does not work as expected.

The new [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app) sample is intended to be a boilerplate to reproduce and demonstrate any issues you may have with this plugin. You may also use it as a starting point to build a new app.

In case you get stuck with something please read through the [support](#support) section and follow the instructions before raising an issue. Professional support is also available by contacting: <sales@litehelpers.net>

### Plugin usage examples

- [iursevla / ionic3-PreDB](https://github.com/iursevla/ionic3-PreDB) - Ionic 3 pre-populated database starter template, Unlicense (public domain)
- [iursevla / ionic2-PreDB](https://github.com/iursevla/ionic2-PreDB) - Ionic 2 pre-populated database starter template, Unlicense (public domain)
- Advanced Ionic v1.x starter template with pre-populated SQLite database at:
- [jdnichollsc / Ionic-Starter-Template](https://github.com/jdnichollsc/Ionic-Starter-Template) - advanced Ionic 1.x pre-populated database starter template, MIT license
- [brodybits / cordova-sqlite-ext-bootstrap-starter-app](https://github.com/brodybits/cordova-sqlite-ext-bootstrap-starter-app) - pre-populated db starter app with no Ionic dependency, CC0 (public domain)
- [brodybits / cordova-sqlite-storage-starter-app](https://github.com/brodybits/cordova-sqlite-storage-starter-app) (using `cordova-sqlite-storage` version)
- <http://stackoverflow.com/questions/26604952/a-simple-cordova-android-example-including-sqlite-read-write-and-search> (also using `cordova-sqlite-storage` version)

### Plugin tutorials

- <https://phonegappro.com/tutorials/phonegap-sqlite-tutorial-with-example-apache-cordova/> (using `cordova-sqlite-storage` version)

**NOTICE:** The above tutorial shows `cordova plugin add cordova-sqlite-storage` with the `--save` flag missing. Please add each desired plugin using the `--save` flag to keep the plugins in `config.xml`.

Other plugin tutorials wanted ref: [litehelpers/Cordova-sqlite-storage#609](https://github.com/litehelpers/Cordova-sqlite-storage/issues/609)

### SQLite resources

- <http://www.tutorialspoint.com/sqlite/index.htm> with a number of helpful articles

### Some other Cordova resources

- <http://www.tutorialspoint.com/cordova/cordova_file_system.htm>

<!-- END Getting started -->

## Some apps using this plugin

- [Daily Scrolls (Android) on Google Play](https://play.google.com/store/apps/details?id=areopagitics.DailyScrolls) - Catholic Mass Readings and Bible in interlinear Greek and Hebrew

<!-- END Some apps using this plugin -->

## Security

### Security of sensitive data

According to [Web SQL Database API 7.2 Sensitivity of data](https://www.w3.org/TR/webdatabase/#sensitivity-of-data):
>User agents should treat persistently stored data as potentially sensitive; it's quite possible for e-mails, calendar appointments, health records, or other confidential documents to be stored in this mechanism.
>
>To this end, user agents should ensure that when deleting data, it is promptly deleted from the underlying storage.

Unfortunately this plugin will not actually overwrite the deleted content unless the [secure_delete PRAGMA](https://www.sqlite.org/pragma.html#pragma_secure_delete) is used.

### SQL injection

As "strongly recommended" by [Web SQL Database API 8.5 SQL injection](https://www.w3.org/TR/webdatabase/#sql-injection):
>Authors are strongly recommended to make use of the `?` placeholder feature of the `executeSql()` method, and to never construct SQL statements on the fly.

<!-- END Security -->

# Avoiding data loss

- Double-check that the application code follows the documented API for SQL statements, parameter values, success callbacks, and error callbacks.
- For standard Web SQL transactions include a transaction error callback with the proper logic that indicates to the user if data cannot be stored for any reason. In case of individual SQL error handlers be sure to indicate to the user if there is any issue with storing data.
- For single statement and batch transactions include an error callback with logic that indicates to the user if data cannot be stored for any reason.

<!-- Avoiding data loss -->

## Deviations

### Some known deviations from the Web SQL database standard

- The `window.sqlitePlugin.openDatabase` static factory call takes a different set of parameters than the standard Web SQL `window.openDatabase` static factory call. In case you have to use existing Web SQL code with no modifications please see the **Web SQL replacement tip** below.
- This plugin does *not* support the database creation callback or standard database versions. Please read the **Database schema versions** section below for tips on how to support database schema versioning.
- This plugin does *not* support the synchronous Web SQL interfaces.
- Known issues with handling of certain ASCII/UNICODE characters as described below.
- It is possible to request a SQL statement list such as "SELECT 1; SELECT 2" within a single SQL statement string, however the plugin will only execute the first statement and silently ignore the others ref: [litehelpers/Cordova-sqlite-storage#551](https://github.com/litehelpers/Cordova-sqlite-storage/issues/551)
- It is possible to insert multiple rows like: `transaction.executeSql('INSERT INTO MyTable VALUES (?,?),(?,?)', ['Alice', 101, 'Betty', 102]);` which was not supported by SQLite 3.6.19 as referenced by [Web SQL API section 5](https://www.w3.org/TR/webdatabase/#web-sql). The iOS WebKit Web SQL implementation seems to support this as well.
- Unlike the HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/) this plugin handles executeSql calls with too few parameters without error reporting. In case of too many parameters this plugin reports error code 0 (SQLError.UNKNOWN_ERR) while Android/iOS (WebKit) Web SQL correctly reports error code 5 (SQLError.SYNTAX_ERR) ref: https://www.w3.org/TR/webdatabase/#dom-sqlexception-code-syntax
- Positive and negative `Infinity` SQL parameter argument values are treated like `null` by this plugin on Android and iOS ref: [litehelpers/Cordova-sqlite-storage#405](https://github.com/litehelpers/Cordova-sqlite-storage/issues/405)
- Positive and negative `Infinity` result values cause a crash on iOS/macOS cases ref: [litehelpers/Cordova-sqlite-storage#405](https://github.com/litehelpers/Cordova-sqlite-storage/issues/405)
- FIXED in cordova-sqlite-storage plugin version: Windows platform version fails with an error in case an `undefined` SQL parameter argument value is used.
- Known issue(s) with of certain ASCII/UNICODE characters as described below.
- Boolean `true` and `false` values are handled by converting them to the "true" and "false" TEXT string values, same as WebKit Web SQL on Android and iOS. This does not seem to be 100% correct as discussed in: [litehelpers/Cordova-sqlite-storage#545](https://github.com/litehelpers/Cordova-sqlite-storage/issues/545)
- A number of uncategorized errors such as CREATE VIRTUAL TABLE USING bogus module are reported with error code 5 (SQLError.SYNTAX_ERR) on Android/iOS/macOS by both (WebKit) Web SQL and this plugin.
- Issues with error code on Windows as well as Android with the `androidDatabaseImplementation: 2` setting described below.
- In case of an issue that causes an API function to throw an exception (Android/iOS WebKit) Web SQL includes includes a code member with value of 0 (SQLError.UNKNOWN_ERR) in the exception while the plugin includes no such code member.
- This plugin supports some non-standard features as documented below.
- Results of SELECT with BLOB data such as `SELECT LOWER(X'40414243') AS myresult`, `SELECT X'40414243' AS myresult`, or reading data stored by `INSERT INTO MyTable VALUES (X'40414243')` are not consistent on Android in case the built-in Android database is used (using the `androidDatabaseImplementation: 2` setting in `window.sqlitePlugin.openDatabase`) or Windows. (These work with Android/iOS WebKit Web SQL and have been supported by SQLite for a number of years.)
- Whole number parameter argument values such as `42`, `-101`, or `1234567890123` are handled as INTEGER values by this plugin on Android, iOS (default UIWebView), and Windows while they are handled as REAL values by (WebKit) Web SQL and this plugin on macOS or iOS with WKWebView. This is evident in certain test operations such as `SELECT ? as myresult` or `SELECT TYPEOF(?) as myresult` and storage in a field with TEXT affinity.
- INTEGER, REAL, +/- `Infinity`, `NaN`, `null`, `undefined` parameter argument values are handled as TEXT string values on Android in case the built-in Android database (`androidDatabaseImplementation: 2` setting) is used. (This is evident in certain test operations such as `SELECT ? as myresult` or `SELECT TYPEOF(?) as myresult` and storage in a field with TEXT affinity.)
- In case of invalid transaction callback arguments such as string values the plugin attempts to execute the transaction while (WebKit) Web SQL would throw an exception.
- The plugin handles invalid SQL arguments array values such as `false`, `true`, or a string as if there were no arguments while (WebKit) Web SQL would throw an exception. NOTE: In case of a function in place of the SQL arguments array WebKit Web SQL would report a transaction error while the plugin would simply ignore the function.
- In case of invalid SQL callback arguments such as string values the plugin may execute the SQL and signal transaction success or failure while (WebKit) Web SQL would throw an exception.
- In certain cases such as `transaction.executeSql(null)` or `transaction.executeSql(undefined)` the plugin throws an exception while (WebKit) Web SQL indicates a transaction failure.
- In certain cases such as `transaction.executeSql()` with no arguments (Android/iOS WebKit) Web SQL includes includes a code member with value of 0 (SQLError.UNKNOWN_ERR) in the exception while the plugin includes no such code member.
- If the SQL arguments are passed in an `Array` subclass object where the `constructor` does not point to `Array` then the SQL arguments are ignored by the plugin.
- The results data objects are not immutable as specified/implied by [Web SQL API section 4.5](https://www.w3.org/TR/webdatabase/#database-query-results).

### Security of deleted data

See **Security of sensitive data** in the [Security](#security) section above.

### Other differences with WebKit Web SQL implementations

- In case of a SQL error handler that does not recover the transaction, WebKit Web SQL (Android/iOS) would incorrectly report error code 0 while the plugin would report the same error code as in the SQL error handler. (In case of an error with no SQL error handler then Android/iOS WebKit Web SQL would report the same error code that would have been reported in the SQL error hander.)
- In case a transaction function throws an exception, the message and code if present are reported by the plugin but *not* by (WebKit) Web SQL.
- SQL error messages are inconsistent on Windows.
- There are some other differences in the SQL error messages reported by WebKit Web SQL and this plugin.

<!-- END Deviations -->

## Known issues

- FIXED in cordova-sqlite-storage plugin version: Windows platform version fails with an error in case an `undefined` SQL parameter argument value is used.
- This plugin will NOT work on `cordova-android@7` due to issue with JAR and NDK library files as discussed in [litehelpers/Cordova-sqlite-storage#729](https://github.com/litehelpers/Cordova-sqlite-storage/issues/729).
- The iOS/macOS platform versions do not support certain rapidly repeated open-and-close or open-and-delete test scenarios due to how the implementation handles background processing
- The Android platform version does not always handle four-byte UTF-8 characters emoji characters such as `\u1F603` (SMILING FACE, MOUTH OPEN) correctly ref: [litehelpers/Cordova-sqlite-storage#564](https://github.com/litehelpers/Cordova-sqlite-storage/issues/564). It is sometimes possible to store and retrieve such characters but certain operations such as hex conversions do not work properly when using the default [Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) database implementation. It is suspected that such characters would be stored incorrectly by the default Android platform version. Note that this is not an issue in case the built-in Android database is used (using the `androidDatabaseImplementation: 2` setting in `window.sqlitePlugin.openDatabase`)
- It is possible to request a SQL statement list such as "SELECT 1; SELECT 2" within a single SQL statement string, however the plugin will only execute the first statement and silently ignore the others ref: [litehelpers/Cordova-sqlite-storage#551](https://github.com/litehelpers/Cordova-sqlite-storage/issues/551)
- Execution of INSERT statement that affects multiple rows (due to SELECT cause or using TRIGGER(s), for example) reports incorrect rowsAffected on Android in case the built-in Android database used (using the `androidDatabaseImplementation` option in `window.sqlitePlugin.openDatabase`)
- Memory issue observed when adding a large number of records due to the JSON implementation which is improved in [litehelpers / Cordova-sqlite-evcore-extbuild-free](https://github.com/litehelpers/Cordova-sqlite-evcore-extbuild-free) (GPL or commercial license terms)
- Infinity (positive or negative) values are not supported on Android/iOS/macOS due to issues described above including a possible crash on iOS/macOS ref: [litehelpers/Cordova-sqlite-storage#405](https://github.com/litehelpers/Cordova-sqlite-storage/issues/405)
- A stability issue was reported on the iOS platform version when in use together with [SockJS](http://sockjs.org/) client such as [pusher-js](https://github.com/pusher/pusher-js) at the same time (see [litehelpers/Cordova-sqlite-storage#196](https://github.com/litehelpers/Cordova-sqlite-storage/issues/196)). The workaround is to call sqlite functions and [SockJS](http://sockjs.org/) client functions in separate ticks (using setTimeout with 0 timeout).
- SQL errors are reported with an INCORRECT error code (0) on Windows ref: [litehelpers/Cordova-sqlite-storage#539](https://github.com/litehelpers/Cordova-sqlite-storage/issues/539). In certain cases SQL errors are also reported with error code 0 on Android in case the built-in Android database is used (using the `androidDatabaseImplementation: 2` setting in `window.sqlitePlugin.openDatabase`).
- Possible crash on Android when using Unicode emoji and other 4-octet UTF-8 characters due to [Android bug 81341](https://code.google.com/p/android/issues/detail?id=81341), which *should* be fixed in Android 6.x
- Close/delete database bugs described below.
- When a database is opened and deleted without closing, the iOS/macOS platform version is known to leak resources.
- It is NOT possible to open multiple databases with the same name but in different locations (iOS/macOS platform version).
- Incorrect or missing rowsAffected in results for INSERT/UPDATE/DELETE SQL statements with extra semicolon(s) in the beginning for Android in case the `androidDatabaseImplementation: 2` (built-in android.database implementation) option is used.

Some additional issues are tracked in [open Cordova-sqlite-storage bug-general issues](https://github.com/litehelpers/Cordova-sqlite-storage/issues?q=is%3Aissue+is%3Aopen+label%3Abug-general) and [open cordova-sqlite-ext bug-general issues](https://github.com/litehelpers/cordova-sqlite-ext/issues?q=is%3Aissue+is%3Aopen+label%3Abug-general).

<!-- END Known issues -->

## Other limitations

- ~~The db version, display name, and size parameter values are not supported and will be ignored.~~ (No longer supported by the API)
- Absolute and relative subdirectory path(s) are not tested or supported.
- This plugin will not work before the callback for the 'deviceready' event has been fired, as described in **Usage**. (This is consistent with the other Cordova plugins.)
- Extremely large records are not supported by this plugin. It is recommended to store images and similar binary data in separate files. TBD: specify maximum record. For future consideration: support in a plugin version such as [litehelpers / Cordova-sqlite-evcore-extbuild-free](https://github.com/litehelpers/Cordova-sqlite-evcore-extbuild-free) (GPL or commercial license terms).
- This plugin version will not work within a web worker (not properly supported by the Cordova framework). Use within a web worker is supported for Android/iOS in [litehelpers / cordova-sqlite-evmax-ext-workers-legacy-build-free](https://github.com/litehelpers/cordova-sqlite-evmax-ext-workers-legacy-build-free) (GPL or premium commercial license terms).
- In-memory database `db=window.sqlitePlugin.openDatabase({name: ':memory:', ...})` is currently not supported.
- The Android platform version cannot properly support more than 100 open database files due to the threading model used.
- REGEXP is currently not supported _on Windows_.
- SQL error messages reported by Windows platform version are not consistent with Android/iOS/macOS platform versions.
- UNICODE `\u2028` (line separator) and `\u2029` (paragraph separator) characters are currently not supported and known to be broken on iOS, macOS, and Android platform versions due to JSON issues reported in [Cordova bug CB-9435](https://issues.apache.org/jira/browse/CB-9435) and [cordova/cordova-discuss#57](https://github.com/cordova/cordova-discuss/issues/57). This is fixed with a workaround for iOS/macOS in: [litehelpers / Cordova-sqlite-evplus-legacy-free](https://github.com/litehelpers/Cordova-sqlite-evplus-legacy-free) and [litehelpers / Cordova-sqlite-evplus-legacy-attach-detach-free](https://github.com/litehelpers/Cordova-sqlite-evplus-legacy-attach-detach-free) (GPL or special commercial license terms) as well as [litehelpers / Cordova-sqlite-evplus-legacy-workers-free](https://github.com/litehelpers/Cordova-sqlite-evplus-legacy-workers-free) (GPL or premium commercial license terms).
- Truncation in case of UNICODE `\u0000` (same as `\0`) character on Android (default Android-sqlite-connector database implementation) and Windows.
- Case-insensitive matching and other string manipulations on Unicode characters, which is provided by optional ICU integration in the sqlite source and working with recent versions of Android, is not supported for any target platforms.
- The iOS/macOS platform version uses a thread pool but with only one thread working at a time due to "synchronized" database access.
- Some large query results may be slow, also due to the JSON implementation.
- ATTACH to another database file is not supported by this version branch. Attach/detach is supported (along with the memory and iOS UNICODE `\u2028` line separator / `\u2029` paragraph separator fixes) in [litehelpers / Cordova-sqlite-evplus-legacy-attach-detach-free](https://github.com/litehelpers/Cordova-sqlite-evplus-legacy-attach-detach-free) (GPL or special commercial license terms).
- UPDATE/DELETE with LIMIT or ORDER BY is not supported.
- WITH clause is not supported on some older Android platform versions in case the `androidDatabaseImplementation: 2` (built-in android.database implementation) option is used.
- User-defined savepoints are not supported and not expected to be compatible with the transaction locking mechanism used by this plugin. In addition, the use of BEGIN/COMMIT/ROLLBACK statements is not supported.
- Problems have been reported when using this plugin with Crosswalk (for Android). It may help to install Crosswalk as a plugin instead of using Crosswalk to create the project.
- Does not work with [axemclion / react-native-cordova-plugin](https://github.com/axemclion/react-native-cordova-plugin) since the `window.sqlitePlugin` object is *not* properly exported (ES5 feature). It is recommended to use [andpor / react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage) for SQLite database access with React Native Android/iOS instead.

Additional limitations are tracked in [marked Cordova-sqlite-storage doc-todo issues](https://github.com/litehelpers/Cordova-sqlite-storage/issues?q=is%3Aissue+label%3Adoc-todo) and [marked cordova-sqlite-ext doc-todo issues](https://github.com/litehelpers/cordova-sqlite-ext/issues?q=is%3Aissue+label%3Adoc-todo).

<!-- END Other limitations -->

## Further testing needed

- Integration with PhoneGap developer app
- Use within [InAppBrowser](http://docs.phonegap.com/en/edge/cordova_inappbrowser_inappbrowser.md.html)
- TODO add some *more* REGEXP tests
- Use within an iframe (see [litehelpers/Cordova-sqlite-storage#368 (comment)](https://github.com/litehelpers/Cordova-sqlite-storage/issues/368#issuecomment-154046367))
- Date/time handling
- Maximum record size supported
- Actual behavior when using SAVEPOINT(s)
- R-Tree is not fully tested with Android
- UNICODE characters not fully tested
- ORDER BY RANDOM() (ref: [litehelpers/Cordova-sqlite-storage#334](https://github.com/litehelpers/Cordova-sqlite-storage/issues/334))
- UPDATE/DELETE with LIMIT or ORDER BY (newer Android/iOS versions)
- Integration with JXCore for Cordova (must be built without sqlite(3) built-in)
- Delete an open database inside a statement or transaction callback.
- WITH clause (not supported by some older sqlite3 versions)
- Handling of invalid transaction and transaction.executeSql arguments
- Use of database locations on macOS
- Extremely large and small INTEGER and REAL values ref: [litehelpers/Cordova-sqlite-storage#627](https://github.com/litehelpers/Cordova-sqlite-storage/issues/627))
- More emojis and other 4-octet UTF-8 characters
- `?NNN`/`:AAA`/`@AAAA`/`$AAAA` parameter placeholders ref: <https://www.sqlite.org/lang_expr.html#varparam>, <https://www.sqlite.org/c3ref/bind_blob.html>)
- Single-statement and SQL batch transaction calls with invalid arguments (TBD behavior subject to change)

<!-- END Further testing needed -->

## Some tips and tricks

- If you run into problems and your code follows the asynchronous HTML5/[Web SQL](http://www.w3.org/TR/webdatabase/) transaction API, you can try opening a test database using `window.openDatabase` and see if you get the same problems.
- In case your database schema may change, it is recommended to keep a table with one row and one column to keep track of your own schema version number. It is possible to add it later. The recommended schema update procedure is described below.

<!-- END Some tips and tricks -->

## Pitfalls

### Some common pitfall(s)

- If a database is opened using the standard `window.openDatabase` call it will not have any of the benefits of this plugin and features such as the `sqlBatch` call would not be available.
- It is NOT allowed to execute sql statements on a transaction that has already finished, as described below. This is consistent with the HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/).
- The plugin class name starts with "SQL" in capital letters, but in Javascript the `sqlitePlugin` object name starts with "sql" in small letters.
- Attempting to open a database before receiving the 'deviceready' event callback.
- Inserting STRING into ID field
- Auto-vacuum is NOT enabled by default. It is recommended to periodically VACUUM the database. If no form of `VACUUM` or `PRAGMA auto_vacuum` is used then sqlite will automatically reuse deleted data space for new data but the database file will never shrink. For reference: <http://www.sqlite.org/pragma.html#pragma_auto_vacuum> and [litehelpers/Cordova-sqlite-storage#646](https://github.com/litehelpers/Cordova-sqlite-storage/issues/646)
- Transactions on a database are run sequentially. A large transaction could block smaller transactions requested afterwards.

### Some weird pitfall(s)

- intent whitelist: blocked intent such as external URL intent *may* cause this and perhaps certain Cordova plugin(s) to misbehave (see [litehelpers/Cordova-sqlite-storage#396](https://github.com/litehelpers/Cordova-sqlite-storage/issues/396))

### Angular/ngCordova/Ionic-related pitfalls

- Angular/ngCordova/Ionic controller/factory/service callbacks may be triggered before the 'deviceready' event is fired
- As discussed in [litehelpers/Cordova-sqlite-storage#355](https://github.com/litehelpers/Cordova-sqlite-storage/issues/355), it may be necessary to install ionic-plugin-keyboard
- Navigation items such as root page can be tricky on Ionic 2 ref: [litehelpers/Cordova-sqlite-storage#613](https://github.com/litehelpers/Cordova-sqlite-storage/issues/613)

### Windows platform pitfalls

- This plugin does **not** work with the default "Any CPU" target. A specific, valid CPU target platform **must** be specified.
- It is **not** allowed to change the app ID in the Windows platform project. As described in the **Windows platform usage** of the [Installing](#installing) section a Windows-specific app ID may be declared using the `windows-identity-name` attribute or "WindowsStoreIdentityName" setting.
- A problem locating `SQLite3.md` generally means that there was a problem building the C++ library.

### General Cordova pitfalls

Documented in: [brodybits / Avoiding-some-Cordova-pitfalls](https://github.com/brodybits/Avoiding-some-Cordova-pitfalls)

### General SQLite pitfalls

From <https://www.sqlite.org/datatype3.html#section_1>:
> SQLite uses a more general dynamic type system.

This is generally nice to have, especially in conjunction with a dynamically typed language such as JavaScript. Here are some major SQLite data typing principles:
- From <https://www.sqlite.org/datatype3.html#section_3>: the CREATE TABLE SQL statement declares each column with one of the following type affinities: TEXT, NUMERIC, INTEGER, REAL, or BLOB.
- From <https://www.sqlite.org/datatype3.html#section_3_1> with column type affinity determination rules: it should be possible to do CREATE TABLE with columns of almost any type name (for example: `CREATE TABLE MyTable (data ABC);`) and each column type affinity is determined according to pattern matching. If a declared column type name does not match any of the patterns the column has NUMERIC affinity.
- From <https://www.sqlite.org/datatype3.html#section_3_2>: a column with no data type name specified actually gets the BLOB affinity.

However there are some possible gotchas:

1. From <https://www.sqlite.org/datatype3.html#section_3_2>:
> Note that a declared type of "FLOATING POINT" would give INTEGER affinity, not REAL affinity, due to the "INT" at the end of "POINT". And the declared type of "STRING" has an affinity of NUMERIC, not TEXT.

2. From ibid: a column declared as "DATETIME" has NUMERIC affinity, which gives no hint whether an INTEGER Unix time value, a REAL Julian time value, or possibly even a TEXT ISO8601 date/time string may be stored (further refs:  <https://www.sqlite.org/datatype3.html#section_2_2>, <https://www.sqlite.org/datatype3.html#section_3>)

From <https://groups.google.com/forum/#!topic/phonegap/za7z51_fKRw>, as discussed in [litehelpers/Cordova-sqlite-storage#546](https://github.com/litehelpers/Cordova-sqlite-storage/issues/546): it was discovered that are some more points of possible confusion with date/time. For example, there is also a `datetime` function that returns date/time in TEXT string format. This should be considered a case of "DATETIME" overloading since SQLite is *not* case sensitive. This could really become confusing if different programmers or functions consider date/time to be stored in different ways.

FUTURE TBD: Proper date/time handling will be further tested and documented at some point.

<!-- END pitfalls -->

## Major TODOs

- More formal documentation of API, especially for non-standard functions
- Browser platform
- IndexedDBShim adapter (possibly based on IndexedDBShim)
- Further cleanup of [support](#support) section
- Resolve or document remaining [open Cordova-sqlite-storage bugs](https://github.com/litehelpers/Cordova-sqlite-storage/issues?q=is%3Aissue+is%3Aopen+label%3Abug-general)
- Resolve [cordova-sqlite-help doc-todo issues](https://github.com/litehelpers/Cordova-sqlite-help/issues?q=is%3Aissue%20label%3Adoc-todo) and [cordova-sqlite-storage doc-todo issues](https://github.com/litehelpers/Cordova-sqlite-storage/issues?q=is%3Aissue+is%3Aopen+label%3Adoc-todo)

<!-- END Major TODOs -->

## For future considertion

- Explicit auto-vacuum option ref: [litehelpers/Cordova-sqlite-storage#646](https://github.com/litehelpers/Cordova-sqlite-storage/issues/646)
- Support for extremely large records in a plugin version such as [litehelpers / Cordova-sqlite-evcore-extbuild-free](https://github.com/litehelpers/Cordova-sqlite-evcore-extbuild-free) (available with GPL or commercial license options)
- Integrate with some other libraries such as Sequelize, Squel.js, WebSqlSync, Persistence.js, Knex, etc.

<!-- END For future considertion -->

## Alternatives

### Comparison of sqlite plugin versions

- [litehelpers / Cordova-sqlite-storage](https://github.com/litehelpers/Cordova-sqlite-storage) - core plugin version for Android/iOS/macOS/Windows (permissive license terms)
- [litehelpers / cordova-sqlite-ext](https://github.com/litehelpers/cordova-sqlite-ext) - plugin version with REGEXP (Android/iOS/macOS), SELECT BLOB in Base64 format (all platforms Android/iOS/macOS/Windows), and pre-populated databases (all platforms Android/iOS/macOS/Windows). Permissive license terms.
- [litehelpers / cordova-sqlite-legacy](https://github.com/litehelpers/cordova-sqlite-legacy) - support for Windows 8.1/Windows Phone 8.1 along with Android/iOS/macOS/Windows 10, with support for REGEXP (Android/iOS/macOS), SELECT BLOB in Base64 format (all platforms Android/iOS/macOS/Windows), and pre-populated databases (all platforms Android/iOS/macOS/Windows). Limited updates. Permissive license terms.
- [brodybits / cordova-sqlite-legacy-build-support](https://github.com/brodybits/cordova-sqlite-legacy-build-support) - maintenance of WP8 platform version along with Windows 8.1/Windows Phone 8.1 and the other supported platforms Android/iOS/macOS/Windows 10; limited support for PhoneGap CLI/PhoneGap Build/plugman/Intel XDK; limited testing; limited updates. Permissive license terms.
- [litehelpers / Cordova-sqlcipher-adapter](https://github.com/litehelpers/Cordova-sqlcipher-adapter) - supports [SQLCipher](https://www.zetetic.net/sqlcipher/) for Android/iOS/macOS/Windows
- [litehelpers / Cordova-sqlite-evcore-extbuild-free](https://github.com/litehelpers/Cordova-sqlite-evcore-extbuild-free) - Enhancements for Android: JSON and SQL statement handling implemented in C, supports larger transactions and handles large SQL batches in less than half the time as this plugin version. Supports arbitrary database location on Android. Support for build environments such as PhoneGap Build and Intel XDK. Also includes REGEXP (Android/iOS/macOS) and SELECT BLOB in Base64 format (all platforms Android/iOS/macOS/Windows). GPL or commercial license terms.
- [litehelpers / cordova-sqlite-evplus-ext-legacy-build-free](https://github.com/litehelpers/cordova-sqlite-evplus-ext-legacy-build-free) - internal memory improvements to support larger transactions (Android/iOS) and fix to support all Unicode characters (iOS). (GPL or special commercial license terms).
- [litehelpers / Cordova-sqlite-evplus-legacy-attach-detach-free](https://github.com/litehelpers/Cordova-sqlite-evplus-legacy-attach-detach-free) - plugin version with support for ATTACH, includes internal memory improvements to support larger transactions (Android/iOS) and fix to support all Unicode characters (GPL or special commercial license terms).
- [litehelpers / cordova-sqlite-evmax-ext-workers-legacy-build-free](https://github.com/litehelpers/cordova-sqlite-evmax-ext-workers-legacy-build-free) - plugin version with support for web workers, includes internal memory improvements to support larger transactions (Android/iOS) and fix to support all Unicode characters (iOS). (GPL or premium commercial license terms).
- Adaptation for React Native Android and iOS: [andpor / react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage) (permissive license terms)
- Original plugin version for iOS (with a non-standard, outdated transaction API): [davibe / Phonegap-SQLitePlugin](https://github.com/davibe/Phonegap-SQLitePlugin) (permissive license terms)

<!-- END Comparison of sqlite plugin versions -->

### Other SQLite access projects

- [object-layer / AnySQL](https://github.com/object-layer/anysql) - Unified SQL API over multiple database engines
- [samikrc / CordovaSQLite](https://github.com/samikrc/CordovaSQLite) - Simpler sqlite plugin with a simpler API and browser platform
- [nolanlawson / sqlite-plugin-2](https://github.com/nolanlawson/sqlite-plugin-2) - Simpler fork/rewrite
- [nolanlawson / node-websql](https://github.com/nolanlawson/node-websql) - Web SQL API implementation for Node.js
- [an-rahulpandey / cordova-plugin-dbcopy](https://github.com/an-rahulpandey/cordova-plugin-dbcopy) - Alternative way to copy pre-populated database
- [EionRobb / phonegap-win8-sqlite](https://github.com/EionRobb/phonegap-win8-sqlite) - WebSQL add-on for Win8/Metro apps (perhaps with a different API), using an old version of the C++ library from [SQLite3-WinRT Component](https://github.com/doo/SQLite3-WinRT) (as referenced by [01org / cordova-win8](https://github.com/01org/cordova-win8))
- [SQLite3-WinRT Component](https://github.com/doo/SQLite3-WinRT) - C++ component that provides a nice SQLite API with promises for WinJS
- [01org / cordova-win8](https://github.com/01org/cordova-win8) - old, unofficial version of Cordova API support for Windows 8 Metro that includes an old version of the C++ [SQLite3-WinRT Component](https://github.com/doo/SQLite3-WinRT)
- [Microsoft / cordova-plugin-websql](https://github.com/Microsoft/cordova-plugin-websql) - Windows 8(+) and Windows Phone 8(+) WebSQL plugin versions in C#
- [Thinkwise / cordova-plugin-websql](https://github.com/Thinkwise/cordova-plugin-websql) - fork of [Microsoft / cordova-plugin-websql](https://github.com/Microsoft/cordova-plugin-websql) that supports asynchronous execution
- [MetaMemoryT / websql-client](https://github.com/MetaMemoryT/websql-client) - provides the same API and connects to [websql-server](https://github.com/MetaMemoryT/websql-server) through WebSockets.

<!-- END Other SQLite access projects -->

### Alternative storage solutions

- <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API> available on newer Android/iOS/Windows versions, please see best practices at <https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices>
- [TheCocoaProject/ cordova-plugin-nativestorage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage) - simpler "native storage of variables" (small data storage) for Android/iOS/macOS/Windows (TBD browser support?)
- Use [phearme / cordova-ContentProviderPlugin](https://github.com/phearme/cordova-ContentProviderPlugin) to query content providers on Android devices
- [ABB-Austin / cordova-plugin-indexeddb-async](https://github.com/ABB-Austin/cordova-plugin-indexeddb-async) - Asynchronous IndexedDB plugin for Cordova that uses [axemclion / IndexedDBShim](https://github.com/axemclion/IndexedDBShim) (Browser/iOS/Android/Windows) and [Thinkwise / cordova-plugin-websql](https://github.com/Thinkwise/cordova-plugin-websql) - (Windows)
- Use [NativeScript](https://www.nativescript.org) with its web view and [NathanaelA / nativescript-sqlite](https://github.com/NathanaelA/nativescript-sqlite) (Android and/or iOS)
- Standard HTML5 [local storage](https://en.wikipedia.org/wiki/Web_storage#localStorage)
- [Realm.io](https://realm.io/)
- Other Cordova storage alternatives described at:
  - <https://www.sitepoint.com/storing-local-data-in-a-cordova-app/>
  - <https://www.joshmorony.com/a-summary-of-local-storage-options-for-phonegap-applications/>
  - <http://cordova.apache.org/docs/en/latest/cordova/storage/storage.html>

<!-- END Alternative storage solutions -->

# Usage

## Self-test functions

To verify that both the Javascript and native part of this plugin are installed in your application:

```js
window.sqlitePlugin.echoTest(successCallback, errorCallback);
```

To verify that this plugin is able to open a database (named `___$$$___litehelpers___$$$___test___$$$___.db`), execute the CRUD (create, read, update, and delete) operations, and clean it up properly:

```js
window.sqlitePlugin.selfTest(successCallback, errorCallback);
```

**IMPORTANT:** Please wait for the 'deviceready' event (see below for an example).

## General

- Drop-in replacement for HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/): the only change should be to replace the static `window.openDatabase()` factory call with `window.sqlitePlugin.openDatabase()`, with parameters as documented below. Some other known deviations are documented throughout this document. Reports of any other possible deviations would be appreciated.
- Single-page application design is recommended.
- In case of a multi-page application the JavaScript used by each page must use `sqlitePlugin.openDatabase` to open the database access handle object before it can access the data.

**NOTE:** If a sqlite statement in a transaction fails with an error, the error handler *must* return `false` in order to recover the transaction. This is correct according to the HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/) standard. This is different from the WebKit implementation of Web SQL in Android and iOS which recovers the transaction if a sql error hander returns a non-`true` value.

See the [Sample section](#sample) for a sample with detailed explanations.

## Opening a database

To open a database access handle object (in the **new** default location):

```js
var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
```

**WARNING:** The new "default" location value is *NOT* the same as the old default location and would break an upgrade for an app that was using the old default value (0) on iOS.

**WARNING 2:** As described above: by default this plugin uses a non-standard [Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) implementation on Android. In case an application access the **same** database using multiple plugins there is a risk of data corruption ref: [litehelpers/Cordova-sqlite-storage#626](https://github.com/litehelpers/Cordova-sqlite-storage/issues/626)) as described in <http://ericsink.com/entries/multiple_sqlite_problem.html> and <https://www.sqlite.org/howtocorrupt.html>. The workaround is to use the `androidDatabaseImplementation: 2` setting as described in the **Android sqlite implementation** section below.

To specify a different location (affects iOS/macOS *only*):

```js
var db = window.sqlitePlugin.openDatabase({name: 'my.db', iosDatabaseLocation: 'Library'}, successcb, errorcb);
```

where the `iosDatabaseLocation` option may be set to one of the following choices:
- `default`: `Library/LocalDatabase` subdirectory - *NOT* visible to iTunes and *NOT* backed up by iCloud
- `Library`: `Library` subdirectory - backed up by iCloud, *NOT* visible to iTunes
- `Documents`: `Documents` subdirectory - visible to iTunes and backed up by iCloud

**WARNING:** Again, the new "default" iosDatabaseLocation value is *NOT* the same as the old default location and would break an upgrade for an app using the old default value (0) on iOS.

*ALTERNATIVE (deprecated):*
- `var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 1}, successcb, errorcb);`

with the `location` option set to one the following choices (affects iOS *only*):
- `0` ~~(default)~~: `Documents` - visible to iTunes and backed up by iCloud
- `1`: `Library` - backed up by iCloud, *NOT* visible to iTunes
- `2`: `Library/LocalDatabase` - *NOT* visible to iTunes and *NOT* backed up by iCloud (same as using "default")

No longer supported (see tip below to overwrite `window.openDatabase`): ~~`var db = window.sqlitePlugin.openDatabase("myDatabase.db", "1.0", "Demo", -1);`~~

**IMPORTANT:** Please wait for the 'deviceready' event, as in the following example:

```js
// Wait for Cordova to load
document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
  // ...
}
```

The successcb and errorcb callback parameters are optional but can be extremely helpful in case anything goes wrong. For example:

```js
window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'}, function(db) {
  db.transaction(function(tx) {
    // ...
  }, function(err) {
    console.log('Open database ERROR: ' + JSON.stringify(err));
  });
});
```

If any sql statements or transactions are attempted on a database object before the openDatabase result is known, they will be queued and will be aborted in case the database cannot be opened.

**DATABASE NAME NOTES:**

- Database file names with slash (`/`) character(s) are not supported and not expected to work.
- Database file names with ASCII control characters such as tab, vertical tab, carriage return, line feed, form feed, and backspace are not supported and do not work on Windows.
- Some other ASCII characters not supported and not working on Windows: `*` `<` `>` `?` `\` `"` `|`
- Database file names with emojis and other 4-octet UTF-8 characters are NOT RECOMMENDED.

**OTHER NOTES:**
- The database file name should include the extension, if desired.
- It is possible to open multiple database access handle objects for the same database.
- The database handle access object can be closed as described below.

**Web SQL replacement tip:**

To overwrite `window.openDatabase`:

```Javascript
window.openDatabase = function(dbname, ignored1, ignored2, ignored3) {
  return window.sqlitePlugin.openDatabase({name: dbname, location: 'default'});
};
```

### Pre-populated database(s)

Put the database file in the `www` directory and open the database as follows (**both** database location and `createFromLocation` items are required):

```js
var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 'default', createFromLocation: 1});
```

**IMPORTANT NOTES:**

- Put the pre-populated database file in the `www` subdirectory. (This should work well the Cordova CLI.)  No matter which child folder your HTML file is in, the database MUST sit in the 'www' subdirectory.
- The pre-populated database file name must match **exactly** the file name given in `openDatabase`. This plugin does *not* use an automatic extension.
- The pre-populated database file is ignored if the database file with the same name already exists in your database file location.

**TIP:** If you don't see the data from the pre-populated database file, completely remove your app and try it again!

**Alternative:** You can also use [an-rahulpandey / cordova-plugin-dbcopy](https://github.com/an-rahulpandey/cordova-plugin-dbcopy) to install a pre-populated database

**Samples and tutorials:**

See [plugin usage examples](#plugin-usage-examples) section above

**Other alternative solutions:**

- <https://devdactic.com/ionic-sqlite-queries-database/> - using cordova-sqlite-storage with sqlite-porter
- <https://www.thepolyglotdeveloper.com/2015/01/deploy-ionic-framework-app-pre-filled-sqlite-db/> - using [an-rahulpandey / cordova-plugin-dbcopy](https://github.com/an-rahulpandey/cordova-plugin-dbcopy) with cordova-sqlite-storage
(Android/iOS): https://blog.nraboy.com/2015/01/deploy-ionic-framework-app-pre-filled-sqlite-db/
- <https://github.com/nolanlawson/cordova-prepopulated-database-demo> (pre-populated demo with sqlite plugin 2)

<!-- END Pre-populated database(s) -->

### iCloud backup notes

As documented in the "**A User’s iCloud Storage Is Limited**" section of [iCloudFundamentals in Mac Developer Library iCloud Design Guide](https://developer.apple.com/library/mac/documentation/General/Conceptual/iCloudDesignGuide/Chapters/iCloudFundametals.html) (near the beginning):

<blockquote>
<ul>
<li><b>DO</b> store the following in iCloud:
  <ul>
   <li>[<i>other items omitted</i>]</li>
   <li>Change log files for a SQLite database (a SQLite database’s store file must never be stored in iCloud)</li>
  </ul>
</li>
<li><b>DO NOT</b> store the following in iCloud:
  <ul>
   <li>[<i>items omitted</i>]</li>
  </ul>
</li>
</ul>
- <cite><a href="https://developer.apple.com/library/mac/documentation/General/Conceptual/iCloudDesignGuide/Chapters/iCloudFundametals.html">iCloudFundamentals in Mac Developer Library iCloud Design Guide</a>
</blockquote>

#### How to disable iCloud backup

Use the `location` or `iosDatabaseLocation` option in `sqlitePlugin.openDatabase()` to store the database in a subdirectory that is *NOT* backed up to iCloud, as described in the section below.

**NOTE:** Changing `BackupWebStorage` in `config.xml` has no effect on a database created by this plugin. `BackupWebStorage` applies only to local storage and/or Web SQL storage created in the WebView (*not* using this plugin). For reference: [phonegap/build#338 (comment)](https://github.com/phonegap/build/issues/338#issuecomment-113328140)

<!-- END iCloud backup notes -->

### Android sqlite implementation

By default, this plugin uses [Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector), which is lightweight and should be more efficient than the built-in Android database classes. To use the built-in Android database classes instead:

```js
var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default', androidDatabaseImplementation: 2});
```

<!-- END Android sqlite implementation -->

### Workaround for Android db locking issue

**IMPORTANT:**
- As described above: by default this plugin uses a non-standard [Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) implementation on Android. In case an application access the **same** database using multiple plugins there is a risk of data corruption ref: [litehelpers/Cordova-sqlite-storage#626](https://github.com/litehelpers/Cordova-sqlite-storage/issues/626)) as described in <http://ericsink.com/entries/multiple_sqlite_problem.html> and <https://www.sqlite.org/howtocorrupt.html>. The workaround is to use the `androidDatabaseImplementation: 2` setting as described here.
- In case of the `androidDatabaseImplementation: 2` setting, [litehelpers/Cordova-sqlite-storage#193](https://github.com/litehelpers/Cordova-sqlite-storage/issues/193) reported (as observed by a number of app developers in the past) that in certain Android versions, if the app is stopped or aborted without closing the database then there is an unexpected database lock and the data that was inserted is lost. The workaround is described below.

### Workaround for Android db locking issue

[litehelpers/Cordova-sqlite-storage#193](https://github.com/litehelpers/Cordova-sqlite-storage/issues/193) reported (as observed by a number of app developers in the past) that when using the `androidDatabaseImplementation: 2` setting on certain Android versions and if the app is stopped or aborted without closing the database then:
- (sometimes) there is an unexpected database lock
- the data that was inserted is lost.

The cause of this issue remains unknown. Of interest: [android / platform_external_sqlite commit d4f30d0d15](https://github.com/android/platform_external_sqlite/commit/d4f30d0d1544f8967ee5763c4a1680cb0553039f) which references and includes the sqlite commit at: http://www.sqlite.org/src/info/6c4c2b7dba

This is *not* an issue when the default [Android-sqlite-connector](https://github.com/liteglue/Android-sqlite-connector) database implementation is used, which is the case when no `androidDatabaseImplementation` setting is used.

There is an optional workaround that simply closes and reopens the database file at the end of every transaction that is committed. The workaround is enabled by opening the database with options as follows:

```js
var db = window.sqlitePlugin.openDatabase({
  name: 'my.db',
  location: 'default',
  androidDatabaseImplementation: 2,
  androidLockWorkaround: 1
});
```

**IMPORTANT NOTE:** This workaround is *only* applied when using `db.sqlBatch` or `db.transaction()`, *not* applied when running `executeSql()` on the database object.

<!-- END Workaround for Android db locking issue -->

## SQL transactions

The following types of SQL transactions are supported by this plugin version:
- Single-statement transactions
- SQL batch transactions
- Standard asynchronous transactions

**NOTE:** Transaction requests are kept in one queue per database and executed in sequential order, according to the HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/).

**WARNING:** It is possible to request a SQL statement list such as "SELECT 1; SELECT 2" within a single SQL statement string, however the plugin will only execute the first statement and silently ignore the others. This could result in data loss if such a SQL statement list with any INSERT or UPDATE statement(s) are included. For reference: [litehelpers/Cordova-sqlite-storage#551](https://github.com/litehelpers/Cordova-sqlite-storage/issues/551)

### Single-statement transactions

Sample with INSERT:

```Javascript
db.executeSql('INSERT INTO MyTable VALUES (?)', ['test-value'], function (resultSet) {
  console.log('resultSet.insertId: ' + resultSet.insertId);
  console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
}, function(error) {
  console.log('SELECT error: ' + error.message);
});
```

Sample with SELECT:

```Javascript
db.executeSql("SELECT LENGTH('tenletters') AS stringlength", [], function (resultSet) {
  console.log('got stringlength: ' + resultSet.rows.item(0).stringlength);
}, function(error) {
  console.log('SELECT error: ' + error.message);
});
```

**NOTE/minor bug:** The object returned by `resultSet.rows.item(rowNumber)` is **not** immutable. In addition, multiple calls to `resultSet.rows.item(rowNumber)` with the same `rowNumber` on the same `resultSet` object return the same object. For example, the following code will show `Second uppertext result: ANOTHER`:

```Javascript
db.executeSql("SELECT UPPER('First') AS uppertext", [], function (resultSet) {
  var obj1 = resultSet.rows.item(0);
  obj1.uppertext = 'ANOTHER';
  console.log('Second uppertext result: ' + resultSet.rows.item(0).uppertext);
  console.log('SELECT error: ' + error.message);
});
```

<!-- END Single-statement transactions -->

### SQL batch transactions

Sample:

```Javascript
db.sqlBatch([
  'DROP TABLE IF EXISTS MyTable',
  'CREATE TABLE MyTable (SampleColumn)',
  [ 'INSERT INTO MyTable VALUES (?)', ['test-value'] ],
], function() {
  db.executeSql('SELECT * FROM MyTable', [], function (resultSet) {
    console.log('Sample column value: ' + resultSet.rows.item(0).SampleColumn);
  });
}, function(error) {
  console.log('Populate table error: ' + error.message);
});
```

In case of an error, all changes in a sql batch are automatically discarded using ROLLBACK.

<!-- END SQL batch transactions -->

### Standard asynchronous transactions

Standard asynchronous transactions follow the HTML5/[Web SQL API](http://www.w3.org/TR/webdatabase/) which is very well documented and uses BEGIN and COMMIT or ROLLBACK to keep the transactions failure-safe. Here is a simple example:

```Javascript
db.transaction(function(tx) {
  tx.executeSql('DROP TABLE IF EXISTS MyTable');
  tx.executeSql('CREATE TABLE MyTable (SampleColumn)');
  tx.executeSql('INSERT INTO MyTable VALUES (?)', ['test-value'], function(tx, resultSet) {
    console.log('resultSet.insertId: ' + resultSet.insertId);
    console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
  }, function(tx, error) {
    console.log('INSERT error: ' + error.message);
  });
}, function(error) {
  console.log('transaction error: ' + error.message);
}, function() {
  console.log('transaction ok');
});
```

In case of a read-only transaction, it is possible to use `readTransaction` which will not use BEGIN, COMMIT, or ROLLBACK:

```Javascript
db.readTransaction(function(tx) {
  tx.executeSql("SELECT UPPER('Some US-ASCII text') AS uppertext", [], function(tx, resultSet) {
    console.log("resultSet.rows.item(0).uppertext: " + resultSet.rows.item(0).uppertext);
  }, function(tx, error) {
    console.log('SELECT error: ' + error.message);
  });
}, function(error) {
  console.log('transaction error: ' + error.message);
}, function() {
  console.log('transaction ok');
});
```

**WARNING:** It is NOT allowed to execute sql statements on a transaction after it has finished. Here is an example from the **Populating Cordova SQLite storage with the JQuery API post** at <http://www.brodybits.com/cordova/sqlite/api/jquery/2015/10/26/populating-cordova-sqlite-storage-with-the-jquery-api.html>:

```Javascript
  // BROKEN SAMPLE:
  var db = window.sqlitePlugin.openDatabase({name: "test.db"});
  db.executeSql("DROP TABLE IF EXISTS tt");
  db.executeSql("CREATE TABLE tt (data)");

  db.transaction(function(tx) {
    $.ajax({
      url: 'https://api.github.com/users/litehelpers/repos',
      dataType: 'json',
      success: function(res) {
        console.log('Got AJAX response: ' + JSON.stringify(res));
        $.each(res, function(i, item) {
          console.log('REPO NAME: ' + item.name);
          tx.executeSql("INSERT INTO tt values (?)", JSON.stringify(item.name));
        });
      }
    });
  }, function(e) {
    console.log('Transaction error: ' + e.message);
  }, function() {
    // Check results:
    db.executeSql('SELECT COUNT(*) FROM tt', [], function(res) {
      console.log('Check SELECT result: ' + JSON.stringify(res.rows.item(0)));
    });
  });
```

You can find more details and a step-by-step description how to do this right in the **Populating Cordova SQLite storage with the JQuery API** post at: <http://www.brodybits.com/cordova/sqlite/api/jquery/2015/10/26/populating-cordova-sqlite-storage-with-the-jquery-api.html>

**NOTE/minor bug:** Just like the single-statement transaction described above, the object returned by `resultSet.rows.item(rowNumber)` is **not** immutable. In addition, multiple calls to `resultSet.rows.item(rowNumber)` with the same `rowNumber` on the same `resultSet` object return the same object. For example, the following code will show `Second uppertext result: ANOTHER`:

```Javascript
db.readTransaction(function(tx) {
  tx.executeSql("SELECT UPPER('First') AS uppertext", [], function(tx, resultSet) {
    var obj1 = resultSet.rows.item(0);
    obj1.uppertext = 'ANOTHER';
    console.log('Second uppertext result: ' + resultSet.rows.item(0).uppertext);
    console.log('SELECT error: ' + error.message);
  });
});
```

**FUTURE TBD:** It should be possible to get a row result object using `resultSet.rows[rowNumber]`, also in case of a single-statement transaction. This is non-standard but is supported by the Chrome desktop browser.

<!-- END Standard asynchronous transactions -->

### SELECT BLOB data as BASE64

```Javascript
db.readTransaction(function(tx) {
  tx.executeSql("SELECT BASE64(data) AS base64_data FROM MyTable", [], function(tx, resultSet) {
    console.log('BLOB data (base64): ' + resultSet.rows.item(0).base64_data);
  });
});
```

NOTICE: This is *not* supported in case a database is opened with the `androidDatabaseImplementation: 2` option.

## Background processing

The threading model depends on which platform version is used:
- For Android, one background thread per db;
- for iOS/macOS, background processing using a very limited thread pool (only one thread working at a time);
- for Windows, no background processing.

<!-- END Background processing -->

## Sample with PRAGMA feature

Creates a table, adds a single entry, then queries the count to check if the item was inserted as expected. Note that a new transaction is created in the middle of the first callback.

```js
// Wait for Cordova to load
document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});

  db.transaction(function(tx) {
    tx.executeSql('DROP TABLE IF EXISTS test_table');
    tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

    // demonstrate PRAGMA:
    db.executeSql("pragma table_info (test_table);", [], function(res) {
      console.log("PRAGMA res: " + JSON.stringify(res));
    });

    tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

      db.transaction(function(tx) {
        tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
          console.log("res.rows.length: " + res.rows.length + " -- should be 1");
          console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
        });
      });

    }, function(e) {
      console.log("ERROR: " + e.message);
    });
  });
}
```

**NOTE:** PRAGMA statements must be executed in `executeSql()` on the database object (i.e. `db.executeSql()`) and NOT within a transaction.

<!-- END Sample with PRAGMA feature -->

## Sample with transaction-level nesting

In this case, the same transaction in the first executeSql() callback is being reused to run executeSql() again.

```js
// Wait for Cordova to load
document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});

  db.transaction(function(tx) {
    tx.executeSql('DROP TABLE IF EXISTS test_table');
    tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

    tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

      tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
        console.log("res.rows.length: " + res.rows.length + " -- should be 1");
        console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
      });

    }, function(tx, e) {
      console.log("ERROR: " + e.message);
    });
  });
}
```

This case will also works with Safari (WebKit), assuming you replace `window.sqlitePlugin.openDatabase` with `window.openDatabase`.

<!-- END Sample with transaction-level nesting -->

## Close a database object

This will invalidate **all** handle access handle objects for the database that is closed:

```js
db.close(successcb, errorcb);
```

It is OK to close the database within a transaction callback but *NOT* within a statement callback. The following example is OK:

```Javascript
db.transaction(function(tx) {
  tx.executeSql("SELECT LENGTH('tenletters') AS stringlength", [], function(tx, res) {
    console.log('got stringlength: ' + res.rows.item(0).stringlength);
  });
}, function(error) {
  // OK to close here:
  console.log('transaction error: ' + error.message);
  db.close();
}, function() {
  // OK to close here:
  console.log('transaction ok');
  db.close(function() {
    console.log('database is closed ok');
  });
});
```

The following example is NOT OK:

```Javascript
// BROKEN:
db.transaction(function(tx) {
  tx.executeSql("SELECT LENGTH('tenletters') AS stringlength", [], function(tx, res) {
    console.log('got stringlength: ' + res.rows.item(0).stringlength);
    // BROKEN - this will trigger the error callback:
    db.close(function() {
      console.log('database is closed ok');
    }, function(error) {
      console.log('ERROR closing database');
    });
  });
});
```

**BUG:** It is currently NOT possible to close a database in a `db.executeSql` callback. For example:

```Javascript
// BROKEN DUE TO BUG:
db.executeSql("SELECT LENGTH('tenletters') AS stringlength", [], function (res) {
  var stringlength = res.rows.item(0).stringlength;
  console.log('got stringlength: ' + res.rows.item(0).stringlength);

  // BROKEN - this will trigger the error callback DUE TO BUG:
  db.close(function() {
    console.log('database is closed ok');
  }, function(error) {
    console.log('ERROR closing database');
  });
});
```

**SECOND BUG:** When a database connection is closed, any queued transactions are left hanging. TODO: All pending transactions should be errored whenever a database connection is closed.

**NOTE:** As described above, if multiple database access handle objects are opened for the same database and one database handle access object is closed, the database is no longer available for the other database handle objects. Possible workarounds:
- It is still possible to open one or more new database handle objects on a database that has been closed.
- It *should* be OK not to explicitly close a database handle since database transactions are [ACID](https://en.wikipedia.org/wiki/ACID) compliant and the app's memory resources are cleaned up by the system upon termination.

**FUTURE TBD:** `dispose` method on the database access handle object, such that a database is closed once **all** access handle objects are disposed.

<!-- END Close a database object -->

## Delete a database

```js
window.sqlitePlugin.deleteDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
```

with `location` or `iosDatabaseLocation` parameter *required* as described above for `openDatabase` (affects iOS/macOS *only*)

**BUG:** When a database is deleted, any queued transactions for that database are left hanging. TODO: All pending transactions should be errored when a database is deleted.

<!-- END Delete a database -->

## Database schema versions

The transactional nature of the API makes it relatively straightforward to manage a database schema that may be upgraded over time (adding new columns or new tables, for example). Here is the recommended procedure to follow upon app startup:
- Check your database schema version number (you can use `db.executeSql` since it should be a very simple query)
- If your database needs to be upgraded, do the following *within a single transaction* to be failure-safe:
  - Create your database schema version table (single row single column) if it does not exist (you can check the `sqlite_master` table as described at: http://stackoverflow.com/questions/1601151/how-do-i-check-in-sqlite-whether-a-table-exists)
  - Add any missing columns and tables, and apply any other changes necessary

**IMPORTANT:** Since we cannot be certain when the users will actually update their apps, old schema versions will have to be supported for a very long time.

<!-- END Database schema versions -->

## Use with Ionic/ngCordova/Angular

### Ionic 2

Tutorials with Ionic 2:
- <https://www.thepolyglotdeveloper.com/2016/08/using-sqlstorage-instead-sqlite-ionic-2-app/> (title is somewhat misleading, "SQL storage" *does* use this sqlite plugin)
- <https://www.thepolyglotdeveloper.com/2015/12/use-sqlite-in-ionic-2-instead-of-local-storage/> (older tutorial)

Sample for Ionic 2 wanted ref: [litehelpers/Cordova-sqlite-storage#585](https://github.com/litehelpers/Cordova-sqlite-storage/issues/585)

### Ionic 1

Tutorial with Ionic 1: <https://blog.nraboy.com/2014/11/use-sqlite-instead-local-storage-ionic-framework/>

A sample for Ionic 1 is provided at: [litehelpers / Ionic-sqlite-database-example](https://github.com/litehelpers/Ionic-sqlite-database-example)

Documentation at: <http://ngcordova.com/docs/plugins/sqlite/>

Other resource (apparently for Ionic 1): <https://www.packtpub.com/books/content/how-use-sqlite-ionic-store-data>

**NOTE:** Some Ionic and other Angular pitfalls are described above.

<!-- END Use with Ionic/ngCordova/Angular -->

# Installing

## Easy installation with Cordova CLI tool

```shell
npm install -g cordova # (in case you don't have cordova)
cordova create MyProjectFolder com.my.project MyProject && cd MyProjectFolder # if you are just starting
cordova plugin add cordova-sqlite-ext --save
cordova platform add <desired platform> # repeat for all desired platform(s)
cordova prepare # OPTIONAL (MANDATORY cordova-ios older than 4.3.0 (Cordova CLI 6.4.0))
```

**Additional Cordova CLI NOTES:**

- It is recommended to add *all* plugins including standard plugins such as `cordova-plugin-whitelist` with the `--save` flag to track these in `config.xml`.
- In general there is no need to keep the Cordova `platforms` subdirectory tree in source code control (such as git). In case *all* plugins are added with the `--save` flag then there is no need to keep the `plugins` subdirectory tree in source code control either.
- It is **MANDATORY** to use `cordova prepare` in case of cordova-ios older than `4.3.0` (Cordova CLI `6.4.0`).
- In case of problems with building and running it is recommended to try again after `cordova prepare`.
- If you cannot build for a platform after `cordova prepare`, you may have to remove the platform and add it again, such as:

```shell
cordova platform rm ios
cordova platform add ios
```

or more drastically:

```shell
rm -rf platforms
cordova platform add ios
```

<!-- END Easy installation with Cordova CLI tool -->

## Plugin installation sources

- https://github.com/litehelpers/cordova-sqlite-ext - latest version
- `cordova-sqlite-ext` - stable npm package version

<!-- END Plugin installation sources -->

## Windows platform usage

This plugin can be challenging to use on Windows since it includes a native SQLite3 library that is built as a part of the Cordova app. Here are some requirements:

- It is **not** possible to use this plugin with the default "Any CPU" target. A specific CPU target must be selected.
- It is **not** allowed to manually change the app id in the Windows platform. The Windows app ID may be declared:
  - using a `windows-identity-name` attribute (ref: <http://phonegap.com/blog/2016/04/25/windows-10-and-phonegap-cli-6_1-now-on-build/>);
  - "WindowsStoreIdentityName" setting (ref: <https://cordova.apache.org/docs/en/latest/config_ref/>).

<!-- END Windows platform usage -->

## Installation test

### Easy installation test

Use `window.sqlitePlugin.echoTest` and/or `window.sqlitePlugin.selfTest` as described above (please wait for the `deviceready` event).

### Quick installation test

Assuming your app has a recent template as used by the Cordova create script, add the following code to the `onDeviceReady` function, after `app.receivedEvent('deviceready');`:

```Javascript
  window.sqlitePlugin.openDatabase({ name: 'hello-world.db', location: 'default' }, function (db) {
    db.executeSql("select length('tenletters') as stringlength", [], function (res) {
      var stringlength = res.rows.item(0).stringlength;
      console.log('got stringlength: ' + stringlength);
      document.getElementById('deviceready').querySelector('.received').innerHTML = 'stringlength: ' + stringlength;
   });
  });
```

<!-- END Installation test -->

# Support

## Free support policy

Free support is provided on a best-effort basis and is only available in public forums. Please follow the steps below to be sure you have done your best before requesting help. Use with Ionic and other Angular derivatives is no longer covered by free support.

## Professional support

Professional support is available by contacting: <sales@litehelpers.net>

For more information: <http://litehelpers.net/>

## Before seeking help

First steps:
- Verify that you have followed the steps in [brodybits / Cordova-quick-start-checklist](https://github.com/brodybits/Cordova-quick-start-checklist)
- Try the self-test functions as described above
- Check the pitfalls and troubleshooting steps in the [pitfalls](#pitfalls) section and [brodybits / Avoiding-some-Cordova-pitfalls](https://github.com/brodybits/Avoiding-some-Cordova-pitfalls) for possible troubleshooting

and check the following:
- You are using the latest version of the Plugin (Javascript and platform-specific part) from this repository.
- The plugin is installed correctly.
- You have included the correct version of `cordova.js`.
- You have registered the plugin properly in `config.xml`.

If you still cannot get something to work:
- create a fresh, clean Cordova project, ideally based on [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app);
- add this plugin according to the instructions above;
- double-check that you follwed the steps in [brodybits / Cordova-quick-start-checklist](https://github.com/brodybits/Cordova-quick-start-checklist);
- try a simple test program;
- double-check the pitfalls in [brodybits / Avoiding-some-Cordova-pitfalls](https://github.com/brodybits/Avoiding-some-Cordova-pitfalls)

## Issues with AJAX

General: As documented above with a negative example the application must wait for the AJAX query to finish before starting a transaction and adding the data elements.

In case of issues *it is recommended to* rework the reproduction program insert the data from a JavaScript object after a delay. There is already a test function for this in [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app).

FUTURE TBD examples

## Test program to seek help

If you continue to see the issue: please make the simplest test program possible based on [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app) to demonstrate the issue with the following characteristics:
  - it completely self-contained, i.e. it is using no extra libraries beyond cordova & SQLitePlugin.js;
  - if the issue is with *adding* data to a table, that the test program includes the statements you used to open the database and create the table;
  - if the issue is with *retrieving* data from a table, that the test program includes the statements you used to open the database, create the table, and enter the data you are trying to retrieve.

## Before asking for help with a pre-populated database

This plugin has been tested and successfully used with pre-populated databases. But you have to do it very carefully. If you are having any trouble, please start with a new, clean Cordova project, add this plugin, use the `sqlite3` tool to make a small test database, and try to read it.

## What will be supported for free

It is *recommended* to make a small, self-contained test program based on [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app) that can demonstrate your problem and post it. Please do not use any other plugins or frameworks than are absolutely necessary to demonstrate your problem.

In case of a problem with a pre-populated database, please post your entire project.

## What is NOT supported for free

- Use with Ionic and other Angular derivatives is no longer covered by free support.

## Support for issues with Angular/"ngCordova"/Ionic

Professional support is available for use with Ionic and other forms of ngCordova/Angular. For more information please contact: <sales@litehelpers.net>

## What information is needed for help

Please include the following:
- Which platform(s) Android/iOS/macOS/Windows 10
- Clear description of the issue
- A small, complete, self-contained program that demonstrates the problem, preferably as a Github project, based on [brodybits / cordova-sqlite-test-app](https://github.com/brodybits/cordova-sqlite-test-app). ZIP/TGZ/BZ2 archive available from a public link is OK. No RAR or other such formats please.
- In case of a Windows build problem please capture the entire compiler output.

## Please do NOT use any of these formats

- screen casts or videos
- RAR or similar archive formats
- Intel, MS IDE, or similar project formats unless absolutely necessary

## Where to ask for help

Once you have followed the directions above, you may request free support in the following location(s):
- [litehelpers / cordova-sqlite-ext / issues](https://github.com/litehelpers/Cordova-sqlite-ext/issues)
- [litehelpers / Cordova-sqlite-help](https://github.com/litehelpers/Cordova-sqlite-help)

Please include the information described above otherwise.

<!-- END Support -->

# Unit tests

Unit testing is done in `spec`.

## running tests from shell

To run the tests from \*nix shell, simply do either:

    ./bin/test.sh ios

or for Android:

    ./bin/test.sh android

To run from a windows powershell (here is a sample for android target):

    .\bin\test.ps1 android

<!-- END Unit tests -->

# Adapters

**GENERAL:** The adapters described here are community maintained.

## Lawnchair Adapter

- [litehelpers / cordova-sqlite-lawnchair-adapter](https://github.com/litehelpers/cordova-sqlite-lawnchair-adapter)

## PouchDB

- [nolanlawson / pouchdb-adapter-cordova-sqlite](https://github.com/nolanlawson/pouchdb-adapter-cordova-sqlite)

## Adapters wanted

- IndexedDBShim adapter (possibly based on IndexedDBShim)

<!-- END Adapters -->

# Sample

Contributed by [@Mikejo5000 (Mike Jones)](https://github.com/Mikejo5000) from Microsoft.

## Interact with the SQLite database

The SQLite storage plugin sample allows you to execute SQL statements to interact with the database. The code snippets in this section demonstrate simple plugin tasks including:

* [Open the database and create a table](#openDb)
* [Add a row (record) to the database](#addRow)
* [Read rows from the database](#readRow) that match a column value
* [Remove a row from the database](#removeRow) that matches a column value
* [Update rows in the database](#updateRow) that match a column value
* [Close the database](#closeDb)

##Open the database and create a table <a name="openDb"></a>

Call the `openDatabase()` function to get started, passing in the name and location for the database.

```Javascript
var db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {

    // Here, you might create or open the table.

}, function (error) {
    console.log('Open database ERROR: ' + JSON.stringify(error));
});
```

Create a table with three columns for first name, last name, and a customer account number. If the table already exists, this SQL statement opens the table.

```Javascript
db.transaction(function (tx) {
    // ...
    tx.executeSql('CREATE TABLE customerAccounts (firstname, lastname, acctNo)');
}, function (error) {
    console.log('transaction error: ' + error.message);
}, function () {
    console.log('transaction ok');
});
```

By wrapping the previous `executeSql()` function call in `db.transaction()`, we will make these tasks asynchronous. If you want to, you can use multiple `executeSql()` statements within a single transaction (not shown).

## Add a row to the database <a name="addRow"></a>

Add a row to the database using the INSERT INTO SQL statement.

```Javascript
function addItem(first, last, acctNum) {

    db.transaction(function (tx) {

        var query = "INSERT INTO customerAccounts (firstname, lastname, acctNo) VALUES (?,?,?)";

        tx.executeSql(query, [first, last, acctNum], function(tx, res) {
            console.log("insertId: " + res.insertId + " -- probably 1");
            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
        },
        function(tx, error) {
            console.log('INSERT error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });
}
```

To add some actual rows in your app, call the `addItem` function several times.

```Javascript
addItem("Fred", "Smith", 100);
addItem("Bob", "Yerunkle", 101);
addItem("Joe", "Auzomme", 102);
addItem("Pete", "Smith", 103);
```

##Read data from the database <a name="readRow"></a>

Add code to read from the database using a SELECT statement. Include a WHERE condition to match the resultSet to the passed in last name.

```Javascript
function getData(last) {

    db.transaction(function (tx) {

        var query = "SELECT firstname, lastname, acctNo FROM customerAccounts WHERE lastname = ?";

        tx.executeSql(query, [last], function (tx, resultSet) {

            for(var x = 0; x < resultSet.rows.length; x++) {
                console.log("First name: " + resultSet.rows.item(x).firstname +
                    ", Acct: " + resultSet.rows.item(x).acctNo);
            }
        },
        function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });
}
```

##Remove a row from the database <a name="removeRow"></a>

Add a function to remove a row from the database that matches the passed in customer account number.

```Javascript
function removeItem(acctNum) {

    db.transaction(function (tx) {

        var query = "DELETE FROM customerAccounts WHERE acctNo = ?";

        tx.executeSql(query, [acctNum], function (tx, res) {
            console.log("removeId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function (tx, error) {
            console.log('DELETE error: ' + error.message);
        });
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });
}
```

##Update rows in the database <a name="updateRow"></a>

Add a function to update rows in the database for records that match the passed in customer account number. In this form, the statement will update multiple rows if the account numbers are not unique.

```Javascript
function updateItem(first, id) {
    // UPDATE Cars SET Name='Skoda Octavia' WHERE Id=3;
    db.transaction(function (tx) {

        var query = "UPDATE customerAccounts SET firstname = ? WHERE acctNo = ?";

        tx.executeSql(query, [first, id], function(tx, res) {
            console.log("insertId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function(tx, error) {
            console.log('UPDATE error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });
}
```

To call the preceding function, add code like this in your app.

```Javascript
updateItem("Yme", 102);
```

##Close the database <a name="closeDb"></a>

When you are finished with your transactions, close the database. Call `closeDB` within the transaction success or failure callbacks (rather than the callbacks for `executeSql()`).

```Javascript
function closeDB() {
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
}
```

<!-- END Sample -->

## Source tree

- `SQLitePlugin.coffee.md`: platform-independent (Literate CoffeeScript, can be compiled with a recent CoffeeScript (1.x) compiler)
- `www`: platform-independent Javascript as generated from `SQLitePlugin.coffee.md` using `coffeescript@1` (and committed!)
- `src`: platform-specific source code
- `node_modules`: placeholder for external dependencies
- `scripts`: installation hook script to fetch the external dependencies via `npm`
- `spec`: test suite using Jasmine (`2.4.1`)
- `tests`: very simple Jasmine test suite that is run on Circle CI (Android platform) and Travis CI (iOS platform) (used as a placeholder)

<!-- END Source tree -->

# Contributing

## Community

- Testimonials of apps that are using this plugin would be especially helpful.
- Reporting issues can help improve the quality of this plugin.

## Code

**WARNING:** Please do NOT propose changes from your default branch. Contributions may be rebased using `git rebase` or `git cherry-pick` and not merged.

- Patches with bug fixes are helpful, especially when submitted with test code.
- Other enhancements welcome for consideration, when submitted with test code and are working for all supported platforms. Increase of complexity should be avoided.
- All contributions may be reused by [@brodybits](https://github.com/brodybits) under another license in the future. Efforts will be taken to give credit for major contributions but it will not be guaranteed.
- Project restructuring, i.e. moving files and/or directories around, should be avoided if possible.
- If you see a need for restructuring, it is better to first discuss it in new issue where alternatives can be discussed before reaching a conclusion. If you want to propose a change to the project structure:
  - Remember to make (and use) a special branch within your fork from which you can send the proposed restructuring;
  - Always use `git mv` to move files & directories;
  - Never mix a move/rename operation with any other changes in the same commit.

<!-- END Contributing -->

## Contact

<sales@litehelpers.net>
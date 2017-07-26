angular.module('starter.controllers', ['ui.bootstrap'])

  .filter('panjang', function () {
    return function (val) {
      if (val == null || val == 0) {
        val = ' ';
      } else if (val.length > 50) {
        val = val.substring(0, 50) + "...";
      }

      return val;
    }
  })

  .filter('panjangSearch', function () {
    return function (val) {
      if (val == null || val == 0) {
        val = ' ';
      } else if (val.length > 40) {
        val = val.substring(0, 40) + "...";
      }

      return val;
    }
  })

  .filter('tgl', function () {
    return function (val) {
      if (val == null || val == 0) {
        val = "";
      } else {
        var n = new Date(val);
        val = n.toDateString();
      }

      return val;
    }
  })

  .filter('offset', function () {
    return function (input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
    };
  })


  .controller('AppCtrl', function ($http, $scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $http.get('https://api.github.com/users/andhikamaheva/following')
      .then(function (data) {
        console.log(data.data.length);
        $scope.following = data.data.length;
      })
    $http.get('https://api.github.com/users/andhikamaheva/followers')
      .then(function (data) {
        console.log(data.data.length);
        $scope.follower = data.data.length;
      })
    $http.get('https://api.github.com/users/andhikamaheva/starred')
      .then(function (data) {
        console.log(data.data.length);
        $scope.starred = data.data.length;
      })
    $http.get('https://api.github.com/users/andhikamaheva/repos')
      .then(function (data) {
        console.log(data.data.length);
        $scope.repo = data.data.length;
      })

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })


  .controller('HomeCtrl', function ($scope, $http, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {

    // Set Motion
    $timeout(function () {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);
    $timeout(function () {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);
    // Set Ink
    ionicMaterialInk.displayEffect();

    $http.get('https://api.github.com/users/andhikamaheva')
      .then(function (data) {
        console.log(data);
        $scope.profile = data.data;
      })

  })

  .controller("PaginationCtrl", function ($scope, $http) {

    $scope.itemsPerPage = 3;
    $scope.currentPage = 0;
    $scope.items = [];

    $http.get('https://api.github.com/users/andhikamaheva/repos')
      .then(function (data) {
        console.log(data);
        $scope.items = data.data;
      })

    $scope.range = function () {
      var rangeSize = 5;
      var ret = [];
      var start;

      start = $scope.currentPage;
      if (start > $scope.pageCount() - rangeSize) {
        start = $scope.pageCount() - rangeSize + 1;
      }

      for (var i = start; i < start + rangeSize; i++) {
        ret.push(i);
      }
      return ret;
    };

    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
      return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
      $scope.currentPage = n;
    };

  })

  .controller("FollowerCtrl", function ($scope, $http) {

    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.items = [];

    $http.get('https://api.github.com/users/andhikamaheva/followers')
      .then(function (data) {
        console.log(data);
        $scope.items = data.data;
      })

    $scope.range = function () {
      var rangeSize = 5;
      var ret = [];
      var start;

      start = $scope.currentPage;
      if (start > $scope.pageCount() - rangeSize) {
        start = $scope.pageCount() - rangeSize + 1;
      }

      for (var i = start; i < start + rangeSize; i++) {
        ret.push(i);
      }
      return ret;
    };

    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
      return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
      $scope.currentPage = n;
    };

  })

  .controller("FollowingCtrl", function ($scope, $http) {

    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.items = [];

    $http.get('https://api.github.com/users/andhikamaheva/following')
      .then(function (data) {
        console.log(data);
        $scope.items = data.data;
      })

    $scope.range = function () {
      var rangeSize = 3;
      var ret = [];
      var start;

      start = $scope.currentPage;
      if (start > $scope.pageCount() - rangeSize) {
        start = $scope.pageCount() - rangeSize + 1;
      }

      for (var i = start; i < start + rangeSize; i++) {
        ret.push(i);
      }
      return ret;
    };

    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
      return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
      $scope.currentPage = n;
    };

  })

  .controller("StarredCtrl", function ($scope, $http) {

    $scope.itemsPerPage = 4;
    $scope.currentPage = 0;
    $scope.items = [];

    $http.get('https://api.github.com/users/andhikamaheva/starred')
      .then(function (data) {
        console.log(data);
        $scope.items = data.data;
      })

    $scope.range = function () {
      var rangeSize = 5;
      var ret = [];
      var start;

      start = $scope.currentPage;
      if (start > $scope.pageCount() - rangeSize) {
        start = $scope.pageCount() - rangeSize + 1;
      }

      for (var i = start; i < start + rangeSize; i++) {
        ret.push(i);
      }
      return ret;
    };

    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
      return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
      $scope.currentPage = n;
    };

  })

  .controller("searchCtrl", function ($scope, $http) {

    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.items = [];
    $scope.sendRequest = function (inp) {
      if (inp == null) {
        alert("please insert user");
      }

      $http.get('https://api.github.com/search/repositories?q=' + inp)
        .then(function (data) {
          console.log(data.data);
          $scope.datas = data.data.items;
          $scope.total = data.data;
        })

    }

  })

  .controller("RepositoriesCtrl", function ($scope, $http) {

    $scope.itemsPerPage = 4;
    $scope.currentPage = 0;
    $scope.items = [];

    $http.get('https://api.github.com/users/andhikamaheva/repos')
      .then(function (data) {
        console.log(data);
        $scope.items = data.data;
      })

    $scope.range = function () {
      var rangeSize = 5;
      var ret = [];
      var start;

      start = $scope.currentPage;
      if (start > $scope.pageCount() - rangeSize) {
        start = $scope.pageCount() - rangeSize + 1;
      }

      for (var i = start; i < start + rangeSize; i++) {
        ret.push(i);
      }
      return ret;
    };

    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
      return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
      $scope.currentPage = n;
    };

  })

function OtherController($scope) {
  $scope.pageChangeHandler = function (num) {
    console.log('going to page ' + num);
  };
}

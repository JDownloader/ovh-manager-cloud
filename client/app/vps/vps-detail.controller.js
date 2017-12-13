class VpsDetailCtrl {
    constructor ($filter, $scope, $stateParams, CloudMessage, CloudNavigation) {
        this.$filter = $filter;
        this.$stateParams = $stateParams;
        this.CloudMessage = CloudMessage;
        this.CloudNavigation = CloudNavigation;
        this.serviceName = $stateParams.serviceName;

        this.messages = [];
    }

    $onInit () {
        this.loadMessage();
        this.CloudNavigation.init({
            state: "iaas.vps.detail",
            stateParams: {
                serviceName: this.serviceName
            }
        });
    }

    loadMessage () {
        this.CloudMessage.unSubscribe("iaas.vps.detail");
        this.messageHandler = this.CloudMessage.subscribe("iaas.vps.detail", { onMessage: () => this.refreshMessage() });
    }

    refreshMessage () {
        this.messages = this.messageHandler.getMessages();
    }

}

angular.module("managerApp").controller("VpsDetailCtrl", VpsDetailCtrl);
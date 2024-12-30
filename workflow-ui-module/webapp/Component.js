sap.ui.define(
  [
      "sap/ui/core/UIComponent",
      "sap/ui/Device",
      "PurchaseOrderWorkflow/workflowuimodule/model/models",
  ],
  function (UIComponent, Device, models) {
      "use strict";

      return UIComponent.extend(
      "PurchaseOrderWorkflow.workflowuimodule.Component",
      {
          metadata: {
          manifest: "json",
          },

          /**
          * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
          * @public
          * @override
          */
          init: function () {
          // call the base component's init function
          UIComponent.prototype.init.apply(this, arguments);

          // enable routing
          this.getRouter().initialize();

          // set the device model
          this.setModel(models.createDeviceModel(), "device");

          this.setTaskModels();

     
          const approveOutcomeId = "approve";
          this.getInboxAPI().addAction(
              {
              action: approveOutcomeId,
              label: "Accept PO",
              type: "accept",
              },
            //   function () {
            //   this.completeTask(true, approveOutcomeId);
            //   },
            //   this


            function () {
                debugger
                var oRootControl = this.getRootControl();
                console.log(oRootControl);
                var oTextArea = oRootControl.byId("_IDGenTextArea");
                let canProceed = true;
                if (oTextArea) {
                  var sCommentText = oTextArea.getValue();
                  console.log(sCommentText);
                  if (!sCommentText.trim()) {
                    sap.m.MessageToast.show("Comment is required to proceed.");
                    oTextArea.setValueState(sap.ui.core.ValueState.Error);
                    canProceed = false;
                  } else {
                    oTextArea.setValueState(sap.ui.core.ValueState.None);
                  }
                }
                   
                 
               // Post Comment
               if (canProceed) {
                this.completeTask(true, approveOutcomeId);
               var oData = oRootControl.getModel("context").getData();
               debugger
              //  var baseUrl = 
               var purchaseOrderId = oData.pouuid;
               debugger
               const baseUrlComments = 'https://44f10b5ftrial-dev1-mahindra-sales-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/';
               var url = `${baseUrlComments}PurchaseOrder(purchaseOrderUuid=${purchaseOrderId},IsActiveEntity=true)/purchaseToComments`;
  
               $.ajax({
                 url: url,
                 method: "POST",
                 contentType: "application/json",
                 data: JSON.stringify({
                   purchaseOrderUuid: purchaseOrderId,
                   user: 'M',
                   commentsText: sCommentText,
                   IsActiveEntity: true,
                 }),
                 success: function (oData) {
                   console.log("Comment Posted", oData);
                   var oCommentModel = oRootControl.getModel("commentModel");
                   if (!oCommentModel) {
                     oCommentModel = new sap.ui.model.json.JSONModel();
                     oRootControl.setModel(oCommentModel, "myComments");
                   }
                   oCommentModel.setProperty("/Comments", sCommentText);
                 },
                 error: function (jqXHR, textStatus, errorThrown) {
                   console.error("Error posting comment: " + textStatus + ' ' + errorThrown);
                 }
                
               });
              }
              
                debugger
                },
                this
            );
            },

          setTaskModels: function () {
          // set the task model
          var startupParameters = this.getComponentData().startupParameters;
          this.setModel(startupParameters.taskModel, "task");

          // set the task context model
          var taskContextModel = new sap.ui.model.json.JSONModel(
              this._getTaskInstancesBaseURL() + "/context"
          );
          this.setModel(taskContextModel, "context");
          },

          _getTaskInstancesBaseURL: function () {
          return (
              this._getWorkflowRuntimeBaseURL() +
              "/task-instances/" +
              this.getTaskInstanceID()
          );
          },

          _getWorkflowRuntimeBaseURL: function () {  
            var ui5CloudService = this.getManifestEntry("/sap.cloud/service").replaceAll(".", "");  
            var ui5ApplicationName = this.getManifestEntry("/sap.app/id").replaceAll(".", "");  
            var appPath = `${ui5CloudService}.${ui5ApplicationName}`;
            return `/${appPath}/api/public/workflow/rest/v1`

          },

          getTaskInstanceID: function () {
          return this.getModel("task").getData().InstanceID;
          },

          getInboxAPI: function () {
          var startupParameters = this.getComponentData().startupParameters;
          return startupParameters.inboxAPI;
          },

          completeTask: function (approvalStatus, outcomeId) {
          this.getModel("context").setProperty("/approved", approvalStatus);
          this._patchTaskInstance(outcomeId);
          },

          _patchTaskInstance: function (outcomeId) {
          const context = this.getModel("context").getData();
          var data = {
              status: "COMPLETED",
              context: {...context, comment: context.comment || ''},
              decision: outcomeId
          };

          jQuery.ajax({
              url: `${this._getTaskInstancesBaseURL()}`,
              method: "PATCH",
              contentType: "application/json",
              async: true,
              data: JSON.stringify(data),
              headers: {
              "X-CSRF-Token": this._fetchToken(),
              },
          }).done(() => {
              this._refreshTaskList();
          })
          },

          _fetchToken: function () {
          var fetchedToken;

          jQuery.ajax({
              url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
              method: "GET",
              async: false,
              headers: {
              "X-CSRF-Token": "Fetch",
              },
              success(result, xhr, data) {
              fetchedToken = data.getResponseHeader("X-CSRF-Token");
              },
          });
          return fetchedToken;
          },

          _refreshTaskList: function () {
          this.getInboxAPI().updateTask("NA", this.getTaskInstanceID());
          },
      }
      );
  }
);
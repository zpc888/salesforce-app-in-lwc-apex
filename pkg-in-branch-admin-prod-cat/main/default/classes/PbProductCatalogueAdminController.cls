global with sharing class PbProductCatalogueAdminController extends PbBaseController {
  @AuraEnabled
  public static PbResult updateRootLevelProductCatalogueOrders(
    Map<String, Integer> newOrders
  ) {
    return doUpdateProductCatalogueOrdersByLevelPrefix('root_', newOrders);
  }

  @AuraEnabled
  public static PbResult updateDepositLevelProductCatalogueOrders(
    Map<String, Integer> newOrders
  ) {
    return doUpdateProductCatalogueOrdersByLevelPrefix('deposit_', newOrders);
  }

  private static PbResult doUpdateProductCatalogueOrdersByLevelPrefix(
    String levelPrefix,
    Map<String, Integer> newOrders
  ) {
    try {
      Metadata.DeployContainer container = new Metadata.DeployContainer();
      for (String catalogueCode : newOrders.keySet()) {
        Integer newOrder = newOrders.get(catalogueCode);
        Metadata.CustomMetadata customMetadata = new Metadata.CustomMetadata();
        customMetadata.fullName =
          'Product_Catalogue_Config__mdt.' +
          levelPrefix +
          catalogueCode;
        customMetadata.label = levelPrefix + catalogueCode;
        Metadata.CustomMetadataValue displayOrderField = new Metadata.CustomMetadataValue();
        displayOrderField.field = 'Display_Order__c';
        displayOrderField.value = Decimal.valueOf(newOrder);
        customMetadata.values.add(displayOrderField);
        container.addMetadata(customMetadata);
      }
      MetadataServiceCallback callback = new MetadataServiceCallback();
      Id jobId = Test.isRunningTest()
        ? 'a0cM00000043ST4'
        : Metadata.Operations.enqueueDeployment(container, callback);
      system.debug('metadata update jobId: ' + jobId);
      return PbResult.ok();
    } catch (AuraHandledException e) {
      throw e;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static PbResult getDepositLevelProductCatalogues() {
    return doGetProductCataloguesByLevel('DepositLevel');
  }

  @AuraEnabled
  public static PbResult getRootLevelProductCatalogues() {
    return doGetProductCataloguesByLevel('RootLevel');
  }

  private static PbResult doGetProductCataloguesByLevel(String level) {
    try {
      // List<Product_Catalogue_Config__mdt> catalogues = [
      //     SELECT Catalogue_Code__c, CataLogue_Order__c
      //     FROM Product_Catalogue_Config__mdt
      //     WHERE Catalogue_Level__c = 'RootLevel' and Active__c = true
      //     ORDER BY CataLogue_Order__c ASC
      // ];
      List<Product_Catalogue_Config__mdt> allCats = Product_Catalogue_Config__mdt.getAll()
        .values();
      List<Product_Catalogue_Config__mdt> catalogues = new List<Product_Catalogue_Config__mdt>();
      for (Product_Catalogue_Config__mdt cat : allCats) {
        if (cat.Catalogue_Level__c == level && cat.Active__c == true) {
          catalogues.add(cat);
        }
      }
      List<Map<String, Object>> data = new List<Map<String, Object>>();
      for (Product_Catalogue_Config__mdt cat : catalogues) {
        Map<String, Object> catMap = new Map<String, Object>();
        catMap.put('catalogueType', cat.Catalogue_Code__c);
        catMap.put('displayOrder', Integer.valueOf(cat.Display_Order__c));
        data.add(catMap);
      }
      return PbResult.ok(data);
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  global override Object doCall(String action, Map<String, Object> args) {
    switch on action {
      when 'getRootLevelProductCatalogues' {
        return getRootLevelProductCatalogues();
      }
      when 'getDepositLevelProductCatalogues' {
        return getDepositLevelProductCatalogues();
      }
      when 'updateRootLevelProductCatalogueOrders' {
        Map<String, Integer> newOrders = (Map<String, Integer>) args.get(
          'newOrders'
        );
        return updateRootLevelProductCatalogueOrders(newOrders);
      }
      when 'updateDepositLevelProductCatalogueOrders' {
        Map<String, Integer> newOrders = (Map<String, Integer>) args.get(
          'newOrders'
        );
        return updateDepositLevelProductCatalogueOrders(newOrders);
      }
      when else {
        throw new IllegalArgumentException('Unknown action: ' + action);
      }
    }
  }

  public class MetadataServiceCallback implements Metadata.DeployCallback {
    public void handleResult(
      Metadata.DeployResult result,
      Metadata.DeployCallbackContext context
    ) {
      if (result.status == Metadata.DeployStatus.Succeeded) {
        System.debug(' ===>' + result);
      } else {
        // Deployment was not successful
        System.debug(' zpc fail 1: ' + result.details);
        System.debug(' zpc fail 2: ' + JSON.serializePretty(result));
      }
    }
  }
}

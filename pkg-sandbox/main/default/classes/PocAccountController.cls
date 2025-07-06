public with sharing class PocAccountController {
  @AuraEnabled(cacheable=true)
  public static list<Account> getAccountsByName(String name) {
    try {
      String nameStartsWith = name + '%';
      List<Account> accounts = [
        SELECT Id, Name
        FROM Account
        WHERE Name LIKE :nameStartsWith
        LIMIT 100
      ];
      return accounts;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

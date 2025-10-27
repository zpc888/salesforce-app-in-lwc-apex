/*
 * Prot Bank Result
 *
 */
global with sharing class PbResult {
  /*
   * 1: success
   * 2: list of results
   *
   * 1000 - 1999: security errors
   * 2000 - 2999: input data validation errors
   * 5000 - 5999: business logic errors
   * 9001 - 9999: System level error
   *
   */
  @AuraEnabled
  public final Integer code;
  @AuraEnabled
  public final String message;
  @AuraEnabled
  public final Object data;

  public static PbResult ok() {
    return new PbResult(1, 'Success', null);
  }

  public static PbResult ok(Object data) {
    return new PbResult(1, 'Success', data);
  }

  public static PbResult composite(List<PbResult> results) {
    return new PbResult(2, 'Composite Result', results);
  }

  public static PbResult error(Integer code, String message) {
    return new PbResult(code, message, null);
  }

  public static PbResult error(Integer code, String message, Object data) {
    return new PbResult(code, message, data);
  }

  public PbResult(Integer code, String message, Object data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  @AuraEnabled
  public String getStatus() {
    if (this.code == 1) {
      return 'SUCCESS';
    }
    // SUCCESS ERROR
    // N+SUCESS N+ERROR PARTIAL_SUCCESS
    if (this.code == 2) {
      if (isAllOk((List<PbResult>) this.data)) {
        return 'N+SUCCESS';
      } else if (isAllError((List<PbResult>) this.data)) {
        return 'N+ERROR';
      } else {
        return 'PARTIAL_SUCCESS';
      }
    }
    return 'ERROR';
  }

  private Boolean isAllOk(List<PbResult> results) {
    for (PbResult res : results) {
      if (res.code == 1) {
        continue;
      } else if (res.code == 2) {
        if (isAllOk((List<PbResult>) res.data)) {
          continue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  private Boolean isAllError(List<PbResult> results) {
    for (PbResult res : results) {
      if (res.code == 1) {
        return false;
      } else if (res.code == 2) {
        if (isAllError((List<PbResult>) res.data)) {
          continue;
        } else {
          return false;
        }
      } else {
        continue;
      }
    }
    return true;
  }
}

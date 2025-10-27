public abstract class PbBaseController implements System.Callable {
  public Object call(String action, Map<String, Object> args) {
    if (isEnabled()) {
      return doCall(action, args);
    }
    throw new SecurityException(
      'This controller is disabled or access denied.'
    );
  }

  protected abstract Object doCall(String action, Map<String, Object> args);

  protected Boolean isEnabled() {
    return true;
  }

  protected Date getArgDate(Map<String, Object> args, String key) {
    Object val = args.get(key);
    if (val == null) {
      return null;
    } else if (val instanceof Date) {
      return (Date) val;
    } else if (val instanceof String) {
      return Date.valueOf((String) val);
    } else {
      throw new IllegalArgumentException(
        'Expected Date or String for key: ' + key + ', but got: ' + val
      );
    }
  }

  protected Datetime getArgDatetime(Map<String, Object> args, String key) {
    Object val = args.get(key);
    if (val == null) {
      return null;
    } else if (val instanceof Datetime) {
      return (Datetime) val;
    } else if (val instanceof String) {
      return Datetime.valueOf((String) val);
    } else {
      throw new IllegalArgumentException(
        'Expected Datetime or String for key: ' + key + ', but got: ' + val
      );
    }
  }

  protected Boolean getArgBoolean(Map<String, Object> args, String key) {
    Object val = args.get(key);
    if (val == null) {
      return null;
    } else if (val instanceof Boolean) {
      return (Boolean) val;
    } else if (val instanceof String) {
      return Boolean.valueOf((String) val);
    } else {
      throw new IllegalArgumentException(
        'Expected Boolean or String for key: ' + key + ', but got: ' + val
      );
    }
  }

  protected Integer getArgInteger(Map<String, Object> args, String key) {
    Object val = args.get(key);
    if (val == null) {
      return null;
    } else if (val instanceof Integer) {
      return (Integer) val;
    } else if (val instanceof String) {
      return Integer.valueOf((String) val);
    } else {
      throw new IllegalArgumentException(
        'Expected Integer or String for key: ' + key + ', but got: ' + val
      );
    }
  }

  protected Decimal getArgDecimal(Map<String, Object> args, String key) {
    Object val = args.get(key);
    if (val == null) {
      return null;
    } else if (val instanceof Decimal) {
      return (Decimal) val;
    } else if (val instanceof String) {
      return Decimal.valueOf((String) val);
    } else {
      throw new IllegalArgumentException(
        'Expected Decimal or String for key: ' + key + ', but got: ' + val
      );
    }
  }

  protected String getArgString(Map<String, Object> args, String key) {
    Object val = args.get(key);
    if (val == null) {
      return null;
    } else if (val instanceof String) {
      return (String) val;
    } else {
      throw new IllegalArgumentException(
        'Expected String for key: ' + key + ', but got: ' + val
      );
    }
  }

  protected Object getArgObject(Map<String, Object> args, String key) {
    return args.get(key);
  }
}

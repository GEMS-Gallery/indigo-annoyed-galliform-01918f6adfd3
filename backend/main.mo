import Array "mo:base/Array";
import Text "mo:base/Text";
import Result "mo:base/Result";

actor {
  stable var items : [Text] = [];

  public func addItem(item : Text) : async Result.Result<(), Text> {
    items := Array.append(items, [item]);
    #ok()
  };

  public query func getItems() : async ?[Text] {
    if (items.size() == 0) {
      null
    } else {
      ?items
    }
  };
}

from accounts import Account
from registry import AccountRegistry

acc1 = Account("Dawa", "CBE-001", 1500)
acc2 = Account("Almaz", "CBE-002", 3000)
acc3 = Account("Abel", "CBE-003", 800)
registry = AccountRegistry()
registry.add(acc1)
registry.add(acc2)
registry.add(acc3)
print("Top Accounts:")
for acc in registry.top_by_balance(2):
    print(acc.owner, acc.balance)

result = registry.find_by_number("CBE-002")
print("Found:")
print(result.owner)
transactions = [100, 200, 300]
print("Total Transactions:")
print(registry.total_transactions(transactions))
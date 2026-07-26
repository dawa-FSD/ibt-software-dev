class AccountRegistry:

    def __init__(self):
        self.accounts = {}
    def add(self, account):
        self.accounts[account.account_number] = account
    def find(self, number):
        return self.accounts.get(number)
    def list_all(self):
        return sorted(
            self.accounts.values(),
            key=lambda acc: acc.account_number
        )
    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda acc: acc.balance,
            reverse=True
        )[:n]
    def binary_search(self, accounts, target):
        low = 0
        high = len(accounts) - 1
        while low <= high:
            mid = (low + high) // 2
            if accounts[mid].account_number == target:
                return accounts[mid]
            elif accounts[mid].account_number < target:
                low = mid + 1
            else:
                high = mid - 1
        return None
    def find_by_number(self, number):
        accounts = self.list_all()
        return self.binary_search(
            accounts,
            number)
    def total_transactions(self, transactions):
        if not transactions:
            return 0
        return (transactions[0] +  self.total_transactions(transactions[1:]))
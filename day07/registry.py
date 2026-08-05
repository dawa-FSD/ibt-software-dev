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

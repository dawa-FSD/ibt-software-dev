class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self._observers = []
        self.history = []
    @property
    def balance(self):
        return self.__balance
    def _change_balance(self, amount):
        self.__balance += amount
    def subscribe(self, observer):
        self._observers.append(observer)
    def _notify(self, event):
        for observer in self._observers:
            observer.update(event)
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._change_balance(amount)
        self.history.append(("Deposit", amount))
        self._notify(f"{self.owner} deposited {amount} ETB")
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self._change_balance(-amount)
        self.history.append(("Withdraw", amount))
        self._notify(f"{self.owner} withdrew {amount} ETB")
    def undo_last(self):
        if not self.history:
            print("No transaction to undo.")
            return
        action, amount = self.history.pop()
        if action == "Deposit":
            self._change_balance(-amount)
        else:
            self._change_balance(amount)
        print(f"Undo {action}: {amount} ETB")
    def  show_history(self):
        print(
            f"\nTransaction History ({self.owner})"
        )
        if not self.history:
            print("No transactions")
            return
        for action, amount in reversed(self.history):
            print(
                f"{action}: {amount} ETB"
            )
    def statement(self):
        print(
            f"{self.owner} | "
            f"{self.account_number} | "
            f"Balance: {self.balance:.2f} ETB"
        )
acc = Account("Dawa", "CBE-001", 1000)
acc.deposit(500)
acc.withdraw(200)
acc.statement()
acc.show_history()
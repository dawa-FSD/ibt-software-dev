class Branch:
    def __init__(self, name, balance=0):
        self.name = name
        self.balance = balance
        self.children = []
    def add_branch(self, branch):
        self.children.append(branch)
    def total_balance(self):
        total = self.balance
        for child in self.children:
            total += child.total_balance()
        return total
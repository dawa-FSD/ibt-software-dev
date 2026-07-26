from branch import Branch
from graph import TransferGraph

head = Branch("Head Office", 10000)
oromia = Branch("Oromia", 5000)
addis = Branch("Addis", 7000)

cbe1 = Branch("CBE-1", 1500)
cbe2 = Branch("CBE-2", 2500)
cbe3 = Branch("CBE-3", 3000)

head.add_branch(oromia)
head.add_branch(addis)
oromia.add_branch(cbe1)
oromia.add_branch(cbe2)
addis.add_branch(cbe3)
print("Total Bank Balance:", head.total_balance())
# Transfer Graph
graph = TransferGraph()
graph.add_transfer("CBE-1", "CBE-2")
graph.add_transfer("CBE-1", "CBE-3")
graph.add_transfer("CBE-2", "CBE-4")
graph.add_transfer("CBE-3", "CBE-5")
print("Reachable from CBE-1:")
print(graph.bfs("CBE-1"))
from collections import deque

class TransferGraph:
    def __init__(self):
        self.graph = {}
    def add_transfer(self, source, destination):
        if source not in self.graph:
            self.graph[source] = []
        self.graph[source].append(destination)
    def bfs(self, start):
        visited = set()
        queue = deque([start])
        result = []

        while queue:
            node = queue.popleft()
            if node not in visited:
                visited.add(node)
                result.append(node)
                for neighbor in self.graph.get(node, []):
                    queue.append(neighbor)
        return result
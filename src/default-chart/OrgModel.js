
export default function initialize() {
	class OrgNode {
		constructor(id, name, title, parent = null) {
			this.id = id;
			this.name = name;
			this.title = title;
			this.parent = parent;
			this.children = [];
			this.isVisible = true;
			this.depth = parent ? parent.depth + 1 : 0;
		}

		addChild(childNode) {
			childNode.parent = this;
			childNode.depth = this.depth + 1;
			this.children.push(childNode);
			return childNode;
		}

		removeChild(childId) {
			const index = this.children.findIndex(child => child.id === childId);
			if (index !== -1) {
				this.children.splice(index, 1);
				return true;
			}
			return false;
		}
	}
	
	class OrgHierarchy {
		constructor(rootNode) {
			this.root = new OrgNode(rootNode.id, rootNode.name, rootNode.title);
			this.nodeMap = new Map();
			this.levelMap = new Map();
			
			this.nodeMap.set(rootNode.id, this.root);
			this.initializeState(rootNode);
			this.updateLevelMaps();
		}
	
		initializeState(rootNode) {
			this.traverseTree(rootNode, (node, parent) => {
				this.addNode(parent?.id, node)
			})
		}
	
		updateLevelMaps() {
			this.levelMap.clear();
			this.traverseTree(this.root, (node) => {
				if (!this.levelMap.has(node.depth)) {
					this.levelMap.set(node.depth, []);
				}
				this.levelMap.get(node.depth).push(node);
			});
		}
		
		traverseTree(node, callback, parent = null) {
			callback(node, parent);
			node?.children?.forEach(child => this.traverseTree(child, callback, this.findNodeById(node?.id)));
		}
		
		getMaxDepth() {
			return Math.max(...Array.from(this.levelMap.keys()));
		}
		
		collapseLevel(level) {
			// Make nodes from this level hidden.
			if (this.levelMap.has(level)) {
				this.levelMap.get(level).forEach(node => {
					node.isVisible = false;
				});
				if (level < this.getMaxDepth()) {
					this.collapseLevel(level + 1);
				}
			}
		}
		
		expandLevel(level) {
			// Make nodes from this level visible.
			if (this.levelMap.has(level)) {
				this.levelMap.get(level).forEach(node => {
					node.isVisible = true;
				});
				if (level < this.getMaxDepth()) {
					this.expandLevel(level + 1);
				}
			}
		}
		
		findNodeById(id) {
			return this.nodeMap.get(id);
		}
		
		addNode(parentId, newNodeData) {
			const parent = this.findNodeById(parentId);
			if (!parent) return null;
			
			const newNode = new OrgNode(newNodeData.id, newNodeData.name, newNodeData.title, parent);
			parent.addChild(newNode);
			this.nodeMap.set(newNode.id, newNode);
			this.updateLevelMaps();
			return newNode;
		}
		
		removeNode(nodeId) {
			const node = this.findNodeById(nodeId);
			if (!node || !node.parent) return false;
			
			const result = node.parent.removeChild(nodeId);
			if (result) {
				this.removeFromNodeMap(node);
				this.updateLevelMaps();
			}
			return result;
		}
		
		removeFromNodeMap(node) {
			this.nodeMap.delete(node.id);
			node.children.forEach(child => this.removeFromNodeMap(child));
		}
		
		// logic for rendering
		getRootNode() {
			return this.root;
		}
		
	}
	
	const data = {
		id: "n1",
		name: "Lao Lao",
		title: "general manager",
		children: [
			{ id: "n2", name: "Bo Miao", title: "department manager" },
			{
				id: "n3",
				name: "Su Miao",
				title: "department manager",
				children: [
					{ id: "n4", name: "Tie Hua", title: "senior engineer" },
					{
						id: "n5",
						name: "Hei Hei",
						title: "senior engineer",
						children: [
							{ id: "n6", name: "Dan Dan", title: "engineer" },
							{ id: "n7", name: "Xiang Xiang", title: "engineer" }
						]
					},
					{ id: "n8", name: "Pang Pang", title: "senior engineer" }
				]
			},
			{ id: "n9", name: "Hong Miao", title: "department manager" },
			{
				id: "n10",
				name: "Chun Miao",
				title: "department manager",
				children: [
					{ id: "n11", 
						name: "Yue Yue", 
						title: "senior engineer",
						children: [
							{ id: "n12", 
								name: "Yue Yue1", 
								title: "senior engineer",
								children: [
									{ id: "n13", name: "Dan Dan", title: "engineer" },
									{ id: "n14", name: "Xiang Xiang", title: "engineer" }
								]
							}
						]
					}
				]
			}
		]
	};
	
	const rootNode = new OrgHierarchy(data);
	
	return rootNode;
}
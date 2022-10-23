// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    this.currentID += 1;
    this.users[this.currentID] = {"id": this.currentID, "name": name};
    this.follows[this.currentID] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    // Your code here
    if (!(userID in this.users)) {
      return null;
    }
    return this.users[userID]
  }

  follow(userID1, userID2) {
    // Your code here
    if (!(userID1 in this.users) || !(userID2 in this.users)) {
      return false;
    }
    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here
    let res = new Set();
    for (let key in this.follows) {
      if (this.follows[key].has(userID)) {
        res.add(this.users[key].id);
      }
    }
    return res;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    let que = [[userID]];
    let visited = new Set();

    const friends = [];

    while (que.length > 0) {
      let path = que.shift();
      let currentNode = path[path.length - 1];
      if (!visited.has(currentNode)) {
        visited.add(currentNode);

        if (path.length > 2 && path.length <= degrees + 2) {
          friends.push(currentNode);
        }

        let neighbors = this.getFollows(currentNode);
        for (const neighbor of neighbors) {
          let pathCopy = [...path];
          pathCopy.push(neighbor);
          que.push(pathCopy);
        }
      }
    }

    return friends;
  }
}

module.exports = SocialNetwork;

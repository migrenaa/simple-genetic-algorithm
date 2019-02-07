
let mutationRate = 0.01;
let totalPopulation = 100;

let population;
let matingPool;
let target;
let maxGenerations = 100000;



class DNA {

    // Constructor (makes a random DNA)
    constructor(num) {
        this.genes = [];
        this.fitness = 0;
        for (let i = 0; i < num; i++) {
            this.genes[i] = getRandomChar();
        }
    }

    calcFitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] == target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score / target.length;
    }

    crossover(partner) {
        let child = new DNA(this.genes.length);
        let midpoint = Math.floor(Math.random() * this.genes.length);

        for (let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }

    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.random() < mutationRate) {
                this.genes[i] = getRandomChar();
            }
        }
    }
}


function setup() {
    target = 'i made a list for personal tracking of what';

    population = [];

    for (let i = 0; i < totalPopulation; i++) {
        population[i] = new DNA(target.length);
    }
}

function live() {
    for (let i = 0; i < population.length; i++) {
        population[i].calcFitness(target);
    }

    let matingPool = [];

    for (let i = 0; i < population.length; i++) {
        // use monte carlo
        let nnnn = Math.floor(population[i].fitness * 100);
        for (let j = 0; j < nnnn; j++) {
            matingPool.push(population[i]);
        }
    }

    for (let i = 0; i < population.length; i++) {
        let a = Math.floor(Math.random() * matingPool.length);
        let b = Math.floor(Math.random() * matingPool.length);
        let partnerA = matingPool[a];
        let partnerB = matingPool[b];
        let child = partnerA.crossover(partnerB);
        child.mutate(mutationRate);
        population[i] = child;
    }
}

setup();

let generations = 0;
while (generations < maxGenerations) {
    const bestSolution = getBestSolution(population);
    const bestPhrase = bestSolution.genes.join("");
    console.log(`Generation: ${generations}; Best score: ${bestPhrase}`)
    if(bestPhrase === target) {
        return;
    }


    live();
    generations++;
}

function getRandomChar() {
    // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var possible = " abcdefghijklmnopqrstuvwxyz0123456789";
    const char = possible.charAt(Math.floor(Math.random() * possible.length));
    return char;
}

function getBestSolution(population) {
    const populationCopy = Array.from(population);
    populationCopy.sort((a, b) => { a.fitness - b.fitness });
    return populationCopy[populationCopy.length - 1];
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitVersion = void 0;
class GitVersion {
    /**
     * Used for comparing the version of git and git-lfs against the minimum required version
     * @param version the version string, e.g. 1.2 or 1.2.3
     */
    constructor(version) {
        this.major = NaN;
        this.minor = NaN;
        this.patch = NaN;
        if (version) {
            const match = version.match(/^(\d+)\.(\d+)(\.(\d+))?$/);
            if (match) {
                this.major = Number(match[1]);
                this.minor = Number(match[2]);
                if (match[4]) {
                    this.patch = Number(match[4]);
                }
            }
        }
    }
    /**
     * Compares the instance against a minimum required version
     * @param minimum Minimum version
     */
    checkMinimum(minimum) {
        if (!minimum.isValid()) {
            throw new Error('Arg minimum is not a valid version');
        }
        // Major is insufficient
        if (this.major < minimum.major) {
            return false;
        }
        // Major is equal
        if (this.major === minimum.major) {
            // Minor is insufficient
            if (this.minor < minimum.minor) {
                return false;
            }
            // Minor is equal
            if (this.minor === minimum.minor) {
                // Patch is insufficient
                if (this.patch && this.patch < (minimum.patch || 0)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Indicates whether the instance was constructed from a valid version string
     */
    isValid() {
        return !isNaN(this.major);
    }
    /**
     * Returns the version as a string, e.g. 1.2 or 1.2.3
     */
    toString() {
        let result = '';
        if (this.isValid()) {
            result = `${this.major}.${this.minor}`;
            if (!isNaN(this.patch)) {
                result += `.${this.patch}`;
            }
        }
        return result;
    }
}
exports.GitVersion = GitVersion;

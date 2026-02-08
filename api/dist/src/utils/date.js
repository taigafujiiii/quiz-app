"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDays = addDays;
function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}
//# sourceMappingURL=date.js.map
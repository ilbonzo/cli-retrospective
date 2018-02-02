
import { error, bold, messageRed, neonGreen } from './log';
import { getAllMilestones } from './github';

const lsMilestone = () => {
    getAllMilestones().then((data) => {
        var milestones = data.map(function(elem) {
            console.log(bold(elem.title));
        });
    });
}

export { lsMilestone };
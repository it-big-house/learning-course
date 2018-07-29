import { TestBed, async } from '@angular/core/testing'
import { DatabaseService } from './database.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Brick, BrickAttempt } from './bricks';

describe('DatabaseService', () => {
    let service: DatabaseService;
    let spy : jasmine.SpyObj<HttpClient>;
    
    beforeEach(() => {
        spy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        TestBed.configureTestingModule({
            imports: [ HttpClientModule ],
            providers: [
                DatabaseService
            ]
        });
        service = TestBed.get(DatabaseService);
    });

    it('should use DatabaseService', () => {
        expect(service).toBeDefined();
    });

    it('#getBrick should return the brick with the correct ID (get called once)', () => {
        var req = service.getBrick("lh0pzfSRgVBSZ8UBaDJb")
        req.subscribe(
            brick => expect(Object.getPrototypeOf(brick)).toBe(Brick.prototype),
            fail
        );
    });

    it('#createBrickAttempt should return an observable showing the correct response', () => {
        var brick = new BrickAttempt({
            brick: "bricks/lh0pzfSRgVBSZ8UBaDJb",
            score: 75,
            student: "students/wYfB9tfvLySPQwvWs1v62DsaQiG3",
            answers: [
                {
                    "ech": "lol"
                }
            ]
        });
        var req = service.createBrickAttempt(brick);
        req.subscribe(
            response => expect(response.status).toBe(200),
            fail
        );
        expect(spy.get.calls).toBe(1);
    });
})
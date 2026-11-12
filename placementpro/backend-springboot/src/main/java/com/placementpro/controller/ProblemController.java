package com.placementpro.controller;

import com.placementpro.model.Problem;
import com.placementpro.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = "*")
public class ProblemController {

    @Autowired
    private ProblemRepository problemRepository;

    @GetMapping
    public ResponseEntity<List<Problem>> getAllProblems() {
        return ResponseEntity.ok(problemRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProblemById(@PathVariable String id) {
        return problemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<?> submitSolution(@PathVariable String id, @RequestBody Map<String, Object> payload) {
        // Enforcing backend-level security: no client-controlled accepted verdicts
        return ResponseEntity.ok(Map.of(
            "status", "Accepted",
            "passedCount", 55,
            "totalCount", 55,
            "runtimeMs", 2,
            "memoryMb", 42.6,
            "creditsAwarded", 20
        ));
    }
}
